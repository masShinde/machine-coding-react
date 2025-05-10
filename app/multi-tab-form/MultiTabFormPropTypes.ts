
export interface ValidationRegex{
    regexs: string | RegExp;
    error: string
}

export interface TabInputType{
    type: 'input' | 'radio' | 'button' | 'checkbox',
    label: string;
    key: string;
    index: number;
    value: any;
    isChecked ?: boolean;
    errorMessage?: string;
    validationRegexs?: ValidationRegex[]
}

export interface TabFormType{
    tabName: string;

    index: string | number;

    key: string;

    inputs: Record<string, TabInputType>
}

export interface MultiTabFormPropTypes{
    data: Record<string, TabFormType>;
}