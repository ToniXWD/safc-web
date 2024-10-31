'use client';
import { useState, useEffect } from 'react';
import { api, API_BASE } from '@/services/api';
import { ComboboxField } from './SelectItem'; // 我们会单独实现这个组件

interface CreateCommentFormProps {
    school_cate: string;
    university: string;
    department: string;
    supervisor: string;
    content: string;
}

async function newComment(data: CreateCommentFormProps) {
    const response = await fetch(API_BASE + '/new/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    console.log(response);
    
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
}
export default function CreateCommentForm() {
    // 可选项状态
    const [schoolCates, setSchoolCates] = useState<string[]>([]);
    const [universities, setUniversities] = useState<string[]>([]);
    const [departments, setDepartments] = useState<string[]>([]);
    const [supervisors, setSupervisors] = useState<string[]>([]);

    // 选中值状态
    const [selectedSchoolCate, setSelectedSchoolCate] = useState<string>('');
    const [selectedUniversity, setSelectedUniversity] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [selectedSupervisor, setSelectedSupervisor] = useState<string>('');
    const [content, setContent] = useState('');

    // 加载学校类型列表
    useEffect(() => {
        api.query({}).then(response => {
            setSchoolCates(response);
        });
    }, []);

    // 当校别改变时，加载学校列表
    useEffect(() => {
        if (selectedSchoolCate) {
            api.query({
                school_cate: selectedSchoolCate
            }).then(response => {
                setUniversities(response);
            });
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
            setSelectedSupervisor('');
        }
    }, [selectedDepartment, selectedUniversity, selectedSchoolCate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const submitData = {
            school_cate: selectedSchoolCate,
            university: selectedUniversity,
            department: selectedDepartment,
            supervisor: selectedSupervisor,
            content
        };

        try {
            await newComment(submitData);
            // 提交成功后清空表单
            setSelectedSchoolCate('');
            setSelectedUniversity('');
            setSelectedDepartment('');
            setSelectedSupervisor('');
            setContent('');
            alert('评论提交成功！');  // 或使用其他提示方式
        } catch (error) {
            alert('提交失败：' + (error instanceof Error ? error : '未知错误'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ComboboxField
                    label="校别"
                    value={selectedSchoolCate}
                    onChange={setSelectedSchoolCate}
                    options={schoolCates}
                    placeholder="请选择或输入校别"
                />

                <ComboboxField
                    label="学校"
                    value={selectedUniversity}
                    onChange={setSelectedUniversity}
                    options={universities}
                    placeholder="请选择或输入学校"
                    disabled={!selectedSchoolCate}
                />

                <ComboboxField
                    label="院系"
                    value={selectedDepartment}
                    onChange={setSelectedDepartment}
                    options={departments}
                    placeholder="请选择或输入院系"
                    disabled={!selectedUniversity}
                />

                <ComboboxField
                    label="导师"
                    value={selectedSupervisor}
                    onChange={setSelectedSupervisor}
                    options={supervisors}
                    placeholder="请选择或输入导师"
                    disabled={!selectedDepartment}
                />
            </div>

            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    评论内容
                </label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-32 bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入评论内容"
                    required
                />
            </div>

            <div className="flex justify-end mt-6">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    提交评论
                </button>
            </div>
        </form>
    );
} 