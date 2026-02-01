'use client';
import { PDFViewer } from '@react-pdf/renderer';
import { ClassicTemplate, ModernTemplate, TechTemplate, AcademicTemplate, ExecutiveTemplate, MinimalAtsTemplate, DeveloperAtsTemplate } from './resume-templates';
import { ResumeData } from '../types/resume';

interface Props {
    data: ResumeData;
    template?: string;
}

export default function ResumePreview({ data, template = 'classic' }: Props) {
    const getTemplate = () => {
        switch (template) {
            case 'modern': return <ModernTemplate data={data} />;
            case 'tech': return <TechTemplate data={data} />;
            case 'academic': return <AcademicTemplate data={data} />;
            case 'executive': return <ExecutiveTemplate data={data} />;
            case 'minimal': return <MinimalAtsTemplate data={data} />;
            case 'developer': return <DeveloperAtsTemplate data={data} />;
            case 'classic':
            default:
                return <ClassicTemplate data={data} />;
        }
    };

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '800px' }}>
            <PDFViewer style={{ width: '100%', height: '100%', border: 'none' }}>
                {getTemplate()}
            </PDFViewer>
        </div>
    );
}
