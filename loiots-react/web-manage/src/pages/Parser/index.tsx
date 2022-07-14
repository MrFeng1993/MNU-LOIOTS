
import React, { useState } from 'react';
import { split as SplitEditor } from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

/* eslint @typescript-eslint/no-var-requires: "off" */
const acornLoose = require('acorn-loose');
/* eslint import/no-extraneous-dependencies: */
const acorn = require('acorn');

const EDITOR_CONFIG = {
    width: '100%',
    mode: 'javascript',
    theme: 'monokai',
    splits: 2,
    orientation: 'horizontal',
    name: 'SPLIT_EDITOR_WINDOW_NAME',
    disabled: false,
    fontSize: 14,
    wrapEnabled: true
};

const ACORN_CONFIG = {
    ecmaVersion: 6,
    locations: false,
    ranges: false
};

const Acorn: React.FC = () => {
    const [value, setValue] = useState(['', '']);

    const onChange = (valueInput: string[]) => {
        console.log(valueInput[0]);
        let result;
        try {
            result = acorn.parse(valueInput[0], ACORN_CONFIG);
        } catch (error) {
            result = acornLoose.parse(valueInput[0], ACORN_CONFIG);
        }
        const value$2 = JSON.stringify(result, null, 2);
        setValue([valueInput[0], value$2]);
    };

    return <div>
        <span className='text-2xl'>Acorn parse Demo:</span>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <SplitEditor
            {...EDITOR_CONFIG}
            value={value}
            name="SPLIT_EDITOR_WINDOW"
            onChange={onChange}
        />
    </div>;
};

export default Acorn;