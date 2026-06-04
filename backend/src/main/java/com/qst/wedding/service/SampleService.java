package com.qst.wedding.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.qst.wedding.common.BusinessException;
import com.qst.wedding.entity.Sample;
import com.qst.wedding.mapper.SampleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 样片业务：列表、详情，以及管理员维护。
 */
@Service
@RequiredArgsConstructor
public class SampleService {

    private final SampleMapper sampleMapper;

    public List<Sample> list() {
        return sampleMapper.selectList(new LambdaQueryWrapper<Sample>().orderByDesc(Sample::getId));
    }

    public Sample getById(Long id) {
        Sample sample = sampleMapper.selectById(id);
        if (sample == null) {
            throw new BusinessException("样片信息不存在");
        }
        return sample;
    }

    public void add(Sample sample) {
        sample.setId(null);
        sampleMapper.insert(sample);
    }

    public void update(Sample sample) {
        if (sample.getId() == null || sampleMapper.selectById(sample.getId()) == null) {
            throw new BusinessException("样片信息不存在");
        }
        sampleMapper.updateById(sample);
    }

    public void delete(Long id) {
        sampleMapper.deleteById(id);
    }
}
