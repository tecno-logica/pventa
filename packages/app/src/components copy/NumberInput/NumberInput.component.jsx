import React, { Component, createRef } from "react";
import { FormControl } from "react-bootstrap";
import { formatNumber, formatRound, removeLeadingZeros } from "../../utils";

class NumberInput extends Component {
    input = createRef();
    value = "";
    caret = 0;

    setValue = (value) => {
        const { format, currency } = this.props;
        const oldValue = String(this.value);

        if (format || currency) {
            if (currency) {
                this.value = formatRound(value, 2);
            } else {
                this.value = formatNumber(value);
            }
        } else {
            this.value = value;
        }
        this.input.current.value = this.value;
        this.setCaret(oldValue);
    };

    conditionedValue() {
        return () => {
            const { value } = this.props;
            if (value != parseFloat(this.value)) {
                this.setValue(value);
            }
        };
    }

    componentDidMount() {
        this.conditionedValue()();
    }

    componentDidUpdate() {
        this.conditionedValue()();
    }

    setCaret(oldValue) {
        if (typeof oldValue !== "string") return "0";
        if (!this.props.format && !this.props.currency) return;
        if (
            oldValue.split(",").length <
            this.input.current.value.split(",").length
        ) {
            this.caret++;
        } else if (
            oldValue.split(",").length >
                this.input.current.value.split(",").length &&
            this.caret > 0
        ) {
            this.caret--;
        }
        this.input.current.selectionStart = this.caret;
        this.input.current.selectionEnd = this.caret;
    }

    handleOnKeyDown = (event) => {
        const { onKeyDown } = this.props,
            { target, which } = event,
            { selectionStart, selectionEnd, value } = target,
            selected = selectionStart !== selectionEnd;
        this.caret = selectionStart;
        switch (which) {
            case 8:
                if (
                    !selected &&
                    (value[this.caret - 1] === "," ||
                        value[this.caret - 1] === ".")
                ) {
                    this.caret -= 1;
                    this.setCaret(value);
                }
                break;
            case 46:
                if (
                    !selected &&
                    (value[this.caret] === "," || value[this.caret] === ".")
                ) {
                    this.caret += 1;
                    this.setCaret(value);
                }
                break;
        }

        return onKeyDown
            ? onKeyDown(event)
            : () => {
                  return;
              };
    };

    handleOnKeyPress = (event) => {
        const { currency, onKeyPress } = this.props,
            {
                target: { value },
                which,
            } = event,
            char = String.fromCharCode(which),
            containsDot = value.includes(".");

        if (!/[0-9]/.test(char) && (currency ? char !== "." : true)) {
            event.preventDefault();
            return;
        }

        if (char === "." && containsDot) {
            event.preventDefault();
        }

        return onKeyPress
            ? onKeyPress(event)
            : () => {
                  return;
              };
    };

    handleInput = (event) => {
        const { onInput } = this.props,
            {
                target: { selectionStart, value },
            } = event;
        this.caret = selectionStart;
        if (value == "") {
            this.input.current.value = "0";
            this.caret = 1;
        }
        this.setValue(parseFloat(this.input.current.value.split(",").join("")));

        return onInput
            ? onInput(event)
            : () => {
                  return;
              };
    };

    render() {
        const {
            value = "",
            currency = false,
            format = false,
            onKeyDown,
            onKeyPress,
            onInput,
            onChange = () => {},
            ...attributes
        } = this.props;

        return (
            <FormControl
                onKeyDown={this.handleOnKeyDown}
                onKeyPress={this.handleOnKeyPress}
                onInput={this.handleInput}
                onChange={onChange}
                {...attributes}
                ref={this.input}
            />
        );
    }
}

export default NumberInput;
