'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Comment } from '@/types';

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
                onCommentsUpdate(response);
            });
        }
    }, [selectedSupervisor, onCommentsUpdate]);

    return (
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 校别选择器 */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        校别
                    </label>
                    <select
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={selectedSchoolCate}
                        onChange={(e) => setSelectedSchoolCate(e.target.value)}
                    >
                        <option value="">请选择校别</option>
                        {schoolCates.map(cate => (
                            <option key={cate} value={cate}>{cate}</option>
                        ))}
                    </select>
                </div>

                {/* 学校选择器 */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        学校
                    </label>
                    <select
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={selectedUniversity}
                        onChange={(e) => setSelectedUniversity(e.target.value)}
                        disabled={!selectedSchoolCate}
                    >
                        <option value="">请选择学校</option>
                        {universities.map(uni => (
                            <option key={uni} value={uni}>{uni}</option>
                        ))}
                    </select>
                </div>

                {/* 院系选择器 */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        院系
                    </label>
                    <select
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        disabled={!selectedUniversity}
                    >
                        <option value="">请选择院系</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>

                {/* 导师选择器 */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        导师
                    </label>
                    <select
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={selectedSupervisor}
                        onChange={(e) => setSelectedSupervisor(e.target.value)}
                        disabled={!selectedDepartment}
                    >
                        <option value="">请选择导师</option>
                        {supervisors.map(sup => (
                            <option key={sup} value={sup}>{sup}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
