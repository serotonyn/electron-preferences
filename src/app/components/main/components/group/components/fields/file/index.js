'use strict';

import React from 'react';
import {isArray} from "../../../../../../../utils/isArray";

class FileField extends React.Component {

    state = {};

    render() {
        const { multiSelections, value, help, label } = this;
        
        const btLabel = value && value.length > 0
            ? (multiSelections ? 'Choose other Files' : 'Choose another File')
            : (multiSelections ? 'Choose Files' : 'Choose a File');

        return (
            <div className="field field-file">
                <div className="field-label">{label}</div>
                <div className="value" onClick={this.choose}>
                    {multiSelections ? "Files" : "File"}:&nbsp;
                    {
                        value
                            ? (
                                multiSelections || value.length > 1
                                    ? <ul>{value.map(v => <li>{v}</li>)}</ul>
                                    : value[0]
                            )
                            : 'None'
                    }
                </div>
                <div className="bt" onClick={this.choose}>
                    {btLabel}
                </div>
                {help && <span className="help">{help}</span>}
            </div>
        );

    }

    get field() {
        return this.props.field;
    }

    get value() { //Always return an array
        const { value } = this.props;
        if (typeof(value) === "undefined")
            return undefined;
        return isArray(value) ? value : [value];
    }

    get label() {
        return this.field.label;
    }

    get type() {
        return this.field.type;
    }

    get help() {
        return this.field.help;
    }
    
    get filters() {
        return this.field.filters || undefined;
    }
    
    get multiSelections() {
        return this.field.multiSelections || false;
    }
    
    get showHiddenFiles() {
        return this.field.showHiddenFiles || false;
    }
    
    get noResolveAliases() {
        return this.field.noResolveAliases || false;
    }
    
    get treatPackageAsDirectory() {
        return this.field.treatPackageAsDirectory || false;
    }
    
    get dontAddToRecent() {
        return this.field.dontAddToRecent || false;
    }

    get onChange() {
        return this.props.onChange;
    }

    choose = () => {
        const { multiSelections, showHiddenFiles, noResolveAliases, treatPackageAsDirectory, dontAddToRecent, filters } = this;
        const properties = ['openFile'];
        if (multiSelections)
            properties.push("multiSelections");
        if (showHiddenFiles)
            properties.push("showHiddenFiles");
        if (noResolveAliases)
            properties.push("noResolveAliases");
        if (treatPackageAsDirectory)
            properties.push("treatPackageAsDirectory");
        if (dontAddToRecent)
            properties.push("dontAddToRecent");

        const result = api.showOpenDialog({
            properties: properties,
            filters: filters
        });

        if (!result)
            return;

        if (result.length) {
            this.onChange(multiSelections ? result : result[0]);
        }
    }

}

export default FileField;
