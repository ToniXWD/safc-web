'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Comment } from '@/types';
import { SelectField } from './SelectField';
import { log } from 'console';

interface SelectionFormProps {
    onCommentsUpdate: (comments: Comment[]) => void;
}

export default function SelectionForm({ onCommentsUpdate }: SelectionFormProps) {
    // 状态管理
    const [schoolCates, setSchoolCates] = useState<string[]>([]);
    const [universities, setUniversities] = useState<string[]>([]);
    const [departments, setDepartments] = useState<string[]>([]);
    const [supervisors, setSupervisors] = useState<string[]>([]);

    // 选中项状态
    const [selectedSchoolCate, setSelectedSchoolCate] = useState<string>('');
    const [selectedUniversity, setSelectedUniversity] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [selectedSupervisor, setSelectedSupervisor] = useState<string>('');


    // 加载学校类型列表
    useEffect(() => {
        api.query({
        }).then(response => {
            setSchoolCates(response);
        });
        // 重置后续选项
        setSelectedUniversity('');
        setDepartments([]);
        setSelectedDepartment('');
        setSupervisors([]);
        setSelectedSupervisor('');
    }, []);


    // 当校别改变时，加载学校列表
    useEffect(() => {
        if (selectedSchoolCate) {
            api.query({
                school_cate: selectedSchoolCate
            }).then(response => {
                setUniversities(response);
            });
            // 重置后续选项
            setSelectedUniversity('');
            setDepartments([]);
            setSelectedDepartment('');
            setSupervisors([]);
            setSelectedSupervisor('');
        }
    }, [selectedSchoolCate]);

    // 当学校改变时，加载院系列表
    useEffect(() => {
        if (selectedUniversity) {
            api.query({
                school_cate: selectedSchoolCate,
                university: selectedUniversity
            }).then(response => {
                setDepartments(response);
            });
            // 重置后续选项
            setSelectedDepartment('');
            setSupervisors([]);
            setSelectedSupervisor('');
        }
    }, [selectedUniversity, selectedSchoolCate]);

    // 当院系改变时，加载导师列表
    useEffect(() => {
        if (selectedDepartment) {
            api.query({
                school_cate: selectedSchoolCate,
                university: selectedUniversity,
                department: selectedDepartment

            }).then(response => {
                setSupervisors(response);
            });
            // 重置导师选项
            setSelectedSupervisor('');
        }
    }, [selectedDepartment, selectedUniversity, selectedSchoolCate]);

    // 当导师选择改变时，更新评论列表
    useEffect(() => {
        if (selectedSupervisor) {
            api.query({
                school_cate: selectedSchoolCate,
                university: selectedUniversity,
                department: selectedDepartment,
                supervisor: selectedSupervisor
            }).then(response => {
                console.log(response);

                onCommentsUpdate(response);
            });
        }
    }, [selectedSupervisor, onCommentsUpdate]);

    return (
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                    label="校别"
                    value={selectedSchoolCate}
                    onChange={setSelectedSchoolCate}
                    options={schoolCates}
                    placeholder="请选择校别"
                />

                <SelectField
                    label="学校"
                    value={selectedUniversity}
                    onChange={setSelectedUniversity}
                    options={universities}
                    placeholder="请选择学校"
                    disabled={!selectedSchoolCate}
                />

                <SelectField
                    label="院系"
                    value={selectedDepartment}
                    onChange={setSelectedDepartment}
                    options={departments}
                    placeholder="请选择院系"
                    disabled={!selectedUniversity}
                />

                <SelectField
                    label="导师"
                    value={selectedSupervisor}
                    onChange={setSelectedSupervisor}
                    options={supervisors}
                    placeholder="请选择导师"
                    disabled={!selectedDepartment}
                />
            </div>
        </div>
    );
}
