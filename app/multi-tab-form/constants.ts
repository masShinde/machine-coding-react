import type { TabFormType } from "./MultiTabFormPropTypes";


export const data: Record<string, TabFormType> = {
    "tab1" :  {
        tabName: "Tab 1" ,
        key: "tab1",
        index: 1,
        inputs: {
            "tab1-input1": {
                type: 'input',
                key: "tab1-input1",
                index: 0,
                label: 'input label',
                value: 'targ',
                validationRegexs: [
                    {
                        regexs: "^.{9,}$",
                        "error": "Length should be more than 8"
                    }
                ]
            },
            "tab1-input2": {
                type: 'radio',
                label: 'radio label',
                index: 1,
                key: "tab1-input2",
                isChecked: false,
                value: 'val2'
            },
            "tab1-input3": {
                type: 'input',
                key: "tab1-input3",
                label: 'input label',
                index: 2,
                value: ''
            },
            "tab1-input4": {
                type: 'checkbox',
                label: 'checkbox label',
                index: 3,
                key: "tab1-input4",
                isChecked: false,
                value: 'check1'
            }
        }
    },
    "tab2": {
            key: "tab2",
            tabName: "Tab 2",
            index: 2,
            inputs: {
                "tab2-input1": {
                    type: "input",
                    label: 'input label',
                    key: "tab2-input1",
                    index: 0,
                    value: ''
                }
            } 
    },
    "tab3": {
        tabName: "Tab 3" ,
        index: 3,
        key: "tab3",
        inputs: {
            "tab3-input1": {
                type: "checkbox",
                label: 'input label',
                key: "tab3-input1",
                isChecked: false,
                index: 0,
                value: 'val1'
            },
            "tab3-input2": {
                type: 'button',
                label: 'input label',
                key: "tab3-input2",
                index: 1,
                value: ''
            }
        }
    }
}