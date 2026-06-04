package com.qst.wedding.controller;

import com.qst.wedding.common.Result;
import com.qst.wedding.entity.Sample;
import com.qst.wedding.service.SampleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sample")
@RequiredArgsConstructor
public class SampleController {

    private final SampleService sampleService;

    @GetMapping("/list")
    public Result<List<Sample>> list() {
        return Result.success(sampleService.list());
    }

    @GetMapping("/{id}")
    public Result<Sample> detail(@PathVariable Long id) {
        return Result.success(sampleService.getById(id));
    }
}
