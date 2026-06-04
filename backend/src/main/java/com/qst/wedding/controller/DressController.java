package com.qst.wedding.controller;

import com.qst.wedding.common.Result;
import com.qst.wedding.dto.OrderCreateDTO;
import com.qst.wedding.dto.OrderReturnDTO;
import com.qst.wedding.entity.Dress;
import com.qst.wedding.entity.DressOrder;
import com.qst.wedding.service.DressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/dress")
@RequiredArgsConstructor
public class DressController {

    private final DressService dressService;

    /** 婚纱列表 */
    @GetMapping("/list")
    public Result<List<Dress>> list() {
        return Result.success(dressService.list());
    }

    /** 婚纱详情 */
    @GetMapping("/{id}")
    public Result<Dress> detail(@PathVariable Long id) {
        return Result.success(dressService.getById(id));
    }

    /** 购买 */
    @PostMapping("/order/create")
    public Result<DressOrder> createOrder(@Valid @RequestBody OrderCreateDTO dto) {
        return Result.success("购买成功", dressService.createOrder(dto));
    }

    /** 我的订单 */
    @GetMapping("/order/my")
    public Result<List<DressOrder>> myOrders(@RequestParam Long userId) {
        return Result.success(dressService.myOrders(userId));
    }

    /** 申请退货 */
    @PostMapping("/order/return")
    public Result<Void> returnOrder(@Valid @RequestBody OrderReturnDTO dto) {
        dressService.returnOrder(dto);
        return Result.success("退货成功", null);
    }
}
