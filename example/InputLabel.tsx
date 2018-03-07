import React, { PureComponent } from 'react';
import { pauseEvent, isParent } from './DOMutils';

interface SelectDocument extends Document {
  selection: any;
}

function getCaretPosition(editableDiv: HTMLDivElement) {
  let caretPos = 0;
  let sel;
  let range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode === editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if ((document as SelectDocument).selection && (document as SelectDocument).selection.createRange) {
    range = (document as SelectDocument).selection.createRange();
    if (range.parentElement() === editableDiv) {
      const tempEl = document.createElement('span');
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      const tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint('EndToEnd', range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}

function setCaret(el: any, pos: any) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.setStart(el.childNodes[0], pos);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

interface TestProps {
  [propName: string]: any;
}

const InputLabel = (Text: any) => {
  class Component extends PureComponent<TestProps> {

    state = {
      edit: false,
    };
    ele: HTMLDivElement;

    componentDidMount() {
      const { text } = this.props;
      this.ele.innerText = text;

      document.addEventListener('click', (e) => {
        if (e.target !== this.ele && isParent(this.ele, e.target)) {
          this.setState({ edit: false });
          this.ele.style.cursor = 'move';
        }
      });

      this.ele.addEventListener('mousedown', (e) => {
        if (this.state.edit) {
          e.stopPropagation();
        }
      });

      this.ele.addEventListener('keydown', (e) => {
        if (this.state.edit) {
          if (
            e.keyCode === 37 ||
            e.keyCode === 38 ||
            e.keyCode === 39 ||
            e.keyCode === 40 ||
            e.keyCode === 32
          ) {
            e.stopPropagation();
          }
        }
      });
    }

    componentWillReceiveProps(nextProps: TestProps) {
      if (!this.state.edit) {
        this.ele.innerText = nextProps.text;
      }
    }

    handleInput = () => {
      const { onChange } = this.props;
      const reg = /“|”|’|‘/g;
      if (this.ele.innerText.search(reg) === -1) {
        onChange(this.ele.innerText);
        return;
      }
      const pos = getCaretPosition(this.ele);
      const text = this.ele.innerText.replace(reg, '"');
      this.ele.innerText = text;
      setCaret(this.ele, pos);
      onChange(text);
    };

    handleKeyDown = (e: any) => {
      // pauseEvent(e);
      if (e.keyCode === 108 || e.keyCode === 13) {
        this.setState({ edit: false });
        this.ele.style.cursor = 'move';
      }
    };

    handleFocus = (e: any) => {
      pauseEvent(e);
      this.setState({ edit: true });
      this.ele.style.cursor = 'text';
    };

    render() {
      const { edit } = this.state;
      const { innerRef, ...other } = this.props;
      return (
        <Text
          innerRef={(e: any) => {
            this.ele = e;
            innerRef && innerRef(e); // eslint-disable-line
          }}
          contentEditable={edit && 'true'}
          suppressContentEditableWarning
          style={{
            outline: 'none',
            borderBottom: edit ? '1px solid #000' : 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '100%',
          }}
          onKeyDown={this.handleKeyDown}
          onDoubleClick={this.handleFocus}
          onInput={this.handleInput}
          {...other}
        />
      );
    }
  }
  return Component;
};

export default InputLabel;
