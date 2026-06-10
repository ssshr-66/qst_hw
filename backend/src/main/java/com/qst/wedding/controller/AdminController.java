package com.qst.wedding.controller;

import com.qst.wedding.common.Result;
import com.qst.wedding.entity.Appointment;
import com.qst.wedding.entity.Dress;
import com.qst.wedding.entity.DressOrder;
import com.qst.wedding.entity.Sample;
import com.qst.wedding.service.AppointmentService;
import com.qst.wedding.service.DressService;
import com.qst.wedding.service.SampleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 管理员接口。课设阶段未接入鉴权框架，前端按角色控制入口，
 * 后续可在此加拦截器校验当前用户 role == ADMIN。
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final DressService dressService;
    private final SampleService sampleService;
    private final AppointmentService appointmentService;

    /* ============ 婚纱管理 ============ */

    @GetMapping("/dress/list")
    public Result<List<Dress>> listAllDress() {
        return Result.success(dressService.list());
    }

    @PostMapping("/dress/add")
    public Result<Void> addDress(@RequestBody Dress dress) {
        dressService.add(dress);
        return Result.success("新增成功", null);
    }

    @PutMapping("/dress/update")
    public Result<Void> updateDress(@RequestBody Dress dress) {
        dressService.update(dress);
        return Result.success("修改成功", null);
    }

    @DeleteMapping("/dress/delete/{id}")
    public Result<Void> deleteDress(@PathVariable Long id) {
        dressService.delete(id);
        return Result.success("删除成功", null);
    }

    @GetMapping("/orders")
    public Result<List<DressOrder>> listAllOrders() {
        return Result.success(dressService.listAllOrders());
    }

    /* ============ 样片管理 ============ */

    @GetMapping("/sample/list")
    public Result<List<Sample>> listAllSample() {
        return Result.success(sampleService.list());
    }

    @PostMapping("/sample/add")
    public Result<Void> addSample(@RequestBody Sample sample) {
        sampleService.add(sample);
        return Result.success("新增成功", null);
    }

    @PutMapping("/sample/update")
    public Result<Void> updateSample(@RequestBody Sample sample) {
        sampleService.update(sample);
        return Result.success("修改成功", null);
    }

    @DeleteMapping("/sample/delete/{id}")
    public Result<Void> deleteSample(@PathVariable Long id) {
        sampleService.delete(id);
        return Result.success("删除成功", null);
    }

    /* ============ 预约管理 ============ */

    @GetMapping("/appointments")
    public Result<List<Appointment>> listAllAppointments() {
        return Result.success(appointmentService.listAll());
    }
}
