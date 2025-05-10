import { useState } from "react";
import Tab from "./components/Tab";
import type {
  MultiTabFormPropTypes,
  TabFormType,
  TabInputType,
} from "./MultiTabFormPropTypes";
import "./styles.css";

function MultiTabForm(props: MultiTabFormPropTypes) {
  const { data } = props;

  const [formState, setFormState] = useState(data);

  const [selectedTabIndex, setSelectedTabIndex] = useState(data["tab1"]?.key);

  const onTabChangeHandler = (tabIndex: string) => {
    setSelectedTabIndex(tabIndex);
  };

  function isValidInput(pattern: string| RegExp, input: string) {
    const regex = new RegExp(pattern);
    return regex.test(input);
  }

  const handleInputChange = (tabKey: string, input: TabInputType, e: any) => {
    const {key: inputKey, validationRegexs} = input;
    const value = e?.target?.value
    let currentError='';

    if(validationRegexs?.length){
        validationRegexs?.reduce((prev, cur)=> {
            const {regexs, error} = cur
            const isValidated = isValidInput(regexs, value)
            if(isValidated){
                return prev && isValidated
            }
            currentError = error
            return prev && isValidated
        }, true)
    }

    const updatedFormState = {
      ...formState,
      [tabKey]: {
        ...formState[tabKey],
        inputs: {
          ...formState[tabKey]?.inputs,
          [inputKey]: {
            ...formState[tabKey]?.inputs?.[inputKey],
            value: value,
            errorMessage: currentError?.length ? currentError : ''
          },
        },
      },
    };
    setFormState(updatedFormState);
  };

  const handleRadioButtonClick = (
    tabKey: string,
    input: TabInputType,
    e: any
  ) => {
    const inputKey = input?.key;
    const currentValue = e?.target?.value;
    const isChecked = currentValue == input?.value && !input?.isChecked

    const updatedFormState = {
      ...formState,
      [tabKey]: {
        ...formState[tabKey],
        inputs: {
          ...formState[tabKey]?.inputs,
          [inputKey]: {
            ...formState[tabKey]?.inputs?.[inputKey],
            isChecked: isChecked,
          },
        },
      },
    };
    setFormState(updatedFormState);
  };

  const handleCheckBoxClick = (
    tabKey: string,
    input: TabInputType,
    e: any
  ) => {
    const inputKey = input?.key;
    const isChecked = e?.target?.checked;

    const updatedFormState = {
      ...formState,
      [tabKey]: {
        ...formState[tabKey],
        inputs: {
          ...formState[tabKey]?.inputs,
          [inputKey]: {
            ...formState[tabKey]?.inputs?.[inputKey],
            isChecked: isChecked,
          },
        },
      },
    };
    setFormState(updatedFormState);

  };

  const handleButtonClick = (tabKey: string, input: TabInputType, e: any) => {
    const formObj = Object.values(formState)?.reduce((prev, tab) => {
        const {inputs} = tab || {}
        const inputsArr =  Object.values(inputs)
        if(inputsArr?.length === 0) return prev
        inputsArr?.forEach((input: TabInputType) => {
            const {key, value} = input
            prev[`${key}` as keyof Object] = value
        })
        return prev
    }, {})
  };

  const renderInput = (tabKey: string, input: TabInputType) => {
    const { type, key, label, value, isChecked, errorMessage} = input;
    switch (type) {
      case "button":
        return (
          <div key={key} className="input-wrapper">
            <button
              onClick={(e) => handleButtonClick(tabKey, input, e)}
              className="button-input"
            >
              {label}
            </button>
            {!!errorMessage && <div>{errorMessage}</div>}
          </div>
        );

      case "checkbox":
        return (
          <div key={key} className="input-wrapper">
            <label>Checkbox</label>
            <input
              onChange={(e) => handleCheckBoxClick(tabKey, input, e)}
              checked={isChecked}
              value={value}
              className="checkbox-input"
              type="checkbox"
            />
            {!!errorMessage && <div>{errorMessage}</div>}
          </div>
        );

      case "radio":
        return (
          <div key={key} className="input-wrapper">
            <label>Radio</label>
            <input
              onClick={(e) => handleRadioButtonClick(tabKey, input, e)}
              checked={isChecked}
              value={value}
              className="radio-input"
              type="radio"
            />
             {!!errorMessage && <div>{errorMessage}</div>}
          </div>
        );

      default:
        return (
          <div key={key} className="input-wrapper">
            <label>Input</label>
            <input
              onInput={(e) => handleInputChange(tabKey, input, e)}
              value={value}
              className="text-input"
            />
             {!!errorMessage && <div>{errorMessage}</div>}
          </div>
        );
    }
  };

  return (
    <div>
      <div className="tabs-wrapper">
        {Object.keys(formState).map((tabKey: string) => {
          const tab = data[tabKey];
          return (
            <Tab
              key={tab?.key}
              tabKey={tab?.key}
              index={tab?.index}
              tabName={tab?.tabName}
              onTabChangeHandler={onTabChangeHandler}
            />
          );
        })}
      </div>
      <div className="form-wrapper">
        {Object.values(formState)
          ?.filter((tabData: TabFormType) => tabData?.key === selectedTabIndex)
          .map((tabData: TabFormType) => {
            return (
              <>
                {Object.values(tabData?.inputs)?.map((input) => {
                  return renderInput(tabData?.key, input);
                })}
              </>
            );
          })}
      </div>
    </div>
  );
}

export default MultiTabForm;
