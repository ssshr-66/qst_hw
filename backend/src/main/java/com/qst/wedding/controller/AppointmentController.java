package com.qst.wedding.controller;

import com.qst.wedding.common.Result;
import com.qst.wedding.dto.AppointmentActionDTO;
import com.qst.wedding.dto.AppointmentCreateDTO;
import com.qst.wedding.dto.AppointmentFinishDTO;
import com.qst.wedding.entity.Appointment;
import com.qst.wedding.entity.Sample;
import com.qst.wedding.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/appointment")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    /** 创建预约 */
    @PostMapping("/create")
    public Result<Appointment> create(@Valid @RequestBody AppointmentCreateDTO dto) {
        return Result.success("预约成功", appointmentService.create(dto));
    }

    /** 我的预约 */
    @GetMapping("/my")
    public Result<List<Appointment>> my(@RequestParam Long userId) {
        return Result.success(appointmentService.my(userId));
    }

    /** 到店报道 */
    @PostMapping("/report")
    public Result<Void> report(@Valid @RequestBody AppointmentActionDTO dto) {
        appointmentService.report(dto);
        return Result.success("报道成功", null);
    }

    /** 取片支付（模拟） */
    @PostMapping("/pay")
    public Result<Sample> pay(@Valid @RequestBody AppointmentActionDTO dto) {
        return Result.success("支付成功，等待取片", appointmentService.pay(dto));
    }

    /** 管理员确认拍摄完成 */
    @PostMapping("/finish")
    public Result<Void> finish(@Valid @RequestBody AppointmentFinishDTO dto) {
        appointmentService.finish(dto);
        return Result.success("拍摄完成确认成功", null);
    }
}
