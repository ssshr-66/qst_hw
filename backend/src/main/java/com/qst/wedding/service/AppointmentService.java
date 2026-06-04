package com.qst.wedding.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.qst.wedding.common.BusinessException;
import com.qst.wedding.dto.AppointmentActionDTO;
import com.qst.wedding.dto.AppointmentCreateDTO;
import com.qst.wedding.dto.AppointmentFinishDTO;
import com.qst.wedding.entity.Appointment;
import com.qst.wedding.entity.Sample;
import com.qst.wedding.mapper.AppointmentMapper;
import com.qst.wedding.mapper.SampleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 拍摄预约业务，核心状态机：
 * 0已预约 -> 1已报道 -> 2已拍摄完成 -> 3已支付待取片。
 */
@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentMapper appointmentMapper;
    private final SampleMapper sampleMapper;

    public static final int STATUS_BOOKED = 0;     // 已预约
    public static final int STATUS_REPORTED = 1;   // 已报道
    public static final int STATUS_FINISHED = 2;   // 已拍摄完成
    public static final int STATUS_PAID = 3;       // 已支付待取片

    /** 创建预约 */
    public Appointment create(AppointmentCreateDTO dto) {
        Sample sample = sampleMapper.selectById(dto.getSampleId());
        if (sample == null) {
            throw new BusinessException("样片信息不存在");
        }
        Appointment appointment = new Appointment();
        appointment.setUserId(dto.getUserId());
        appointment.setSampleId(dto.getSampleId());
        appointment.setAppointmentTime(dto.getAppointmentTime());
        appointment.setStatus(STATUS_BOOKED);
        appointmentMapper.insert(appointment);
        return appointment;
    }

    /** 我的预约 */
    public List<Appointment> my(Long userId) {
        return appointmentMapper.selectList(new LambdaQueryWrapper<Appointment>()
                .eq(Appointment::getUserId, userId)
                .orderByDesc(Appointment::getId));
    }

    /** 到店报道：校验归属、状态、时间 */
    public void report(AppointmentActionDTO dto) {
        Appointment appointment = getOwned(dto.getAppointmentId(), dto.getUserId());
        if (appointment.getStatus() != STATUS_BOOKED) {
            throw new BusinessException("当前预约状态不允许报道");
        }
        if (LocalDateTime.now().isBefore(appointment.getAppointmentTime())) {
            throw new BusinessException("未到预约时间，暂不能报道");
        }
        appointment.setStatus(STATUS_REPORTED);
        appointment.setReportTime(LocalDateTime.now());
        appointmentMapper.updateById(appointment);
    }

    /** 取片支付（模拟）：校验归属与状态，返回套餐价格 */
    public Sample pay(AppointmentActionDTO dto) {
        Appointment appointment = getOwned(dto.getAppointmentId(), dto.getUserId());
        if (appointment.getStatus() != STATUS_FINISHED) {
            throw new BusinessException("当前预约状态不允许支付");
        }
        appointment.setStatus(STATUS_PAID);
        appointment.setPayTime(LocalDateTime.now());
        appointmentMapper.updateById(appointment);
        return sampleMapper.selectById(appointment.getSampleId());
    }

    /** 管理员确认拍摄完成 */
    public void finish(AppointmentFinishDTO dto) {
        Appointment appointment = appointmentMapper.selectById(dto.getAppointmentId());
        if (appointment == null) {
            throw new BusinessException("预约不存在");
        }
        if (appointment.getStatus() != STATUS_REPORTED) {
            throw new BusinessException("当前预约状态不允许确认拍摄完成");
        }
        appointment.setStatus(STATUS_FINISHED);
        appointment.setFinishTime(LocalDateTime.now());
        appointmentMapper.updateById(appointment);
    }

    /** 管理员查看全部预约 */
    public List<Appointment> listAll() {
        return appointmentMapper.selectList(new LambdaQueryWrapper<Appointment>()
                .orderByDesc(Appointment::getId));
    }

    /** 取出预约并校验归属 */
    private Appointment getOwned(Long appointmentId, Long userId) {
        Appointment appointment = appointmentMapper.selectById(appointmentId);
        if (appointment == null) {
            throw new BusinessException("预约不存在");
        }
        if (!appointment.getUserId().equals(userId)) {
            throw new BusinessException("无权限操作该数据");
        }
        return appointment;
    }
}
