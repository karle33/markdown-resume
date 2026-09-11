import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import bucket from "../../icons/bucket.svg";

import {
  ENTER_DELAY,
  LEAVE_DELAY,
  DATA_MARKDOWN,
  DATA_ORIGIN
} from "../../utils/constant";
import { toggleThemeText } from "../../utils/themeFormat";

import { observer, inject } from "mobx-react";

@inject("navbar")
@inject("resume")
@inject("hint")
@observer
class Bucket extends Component {
  /**
   * 更新markdown样式
   */
  updateStyle = event => {
    event.stopPropagation();
    const id = this.props.resume.choosenKey;
    const { isMarkdownMode } = this.props.navbar;
    if (isMarkdownMode) {
      this.updateMarkdown(id);
    } else {
      this.updateNormal(id);
    }
  };

  updateMarkdown = id => {
    const element = document.getElementById(id);
    const content = element.getAttribute(DATA_MARKDOWN);
    const selectValue = window.getSelection().toString();
    if (!selectValue) {
      this.props.hint.setError({
        isOpen: true,
        message: "请选择文本"
      });
      return;
    }

    const updatedContent = toggleThemeText(content, selectValue, "`");
    if (updatedContent === null) {
      this.showOverlapError();
      return;
    }
    // 更新markdown内容
    element.childNodes[0].innerText = updatedContent;
    element.setAttribute(DATA_MARKDOWN, updatedContent);
  };

  updateNormal = id => {
    const element = document.getElementById(id);
    const content = element.getAttribute(DATA_ORIGIN);
    const selectValue = window.getSelection().toString();
    if (selectValue) {
      const updatedContent = toggleThemeText(
        content,
        selectValue,
        "<code>",
        "</code>"
      );
      if (updatedContent === null) {
        this.showOverlapError();
        return;
      }
      element.childNodes[0].innerHTML = updatedContent;
      element.setAttribute(DATA_ORIGIN, updatedContent);
    } else {
      this.props.hint.setError({
        isOpen: true,
        message: "请选择文本"
      });
    }
  };

  showOverlapError = () => {
    this.props.hint.setError({
      isOpen: true,
      message: "主题色位置请不要与其他加粗、主题色和链接位置重合"
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Tooltip
        title="油漆桶"
        placement="bottom"
        enterDelay={ENTER_DELAY}
        leaveDelay={LEAVE_DELAY}
      >
        <Button
          disabled={this.props.navbar.isDisabled}
          onClick={this.updateStyle}
          className={classes.btn}
          classes={{
            root: classes.minWidth,
            disabled: classes.opacity
          }}
        >
          <img src={bucket} alt="logo" />
        </Button>
      </Tooltip>
    );
  }
}

const styles = theme => ({
  list: {
    display: "flex",
    marginLeft: "5px"
  },
  btn: {
    padding: "6px 10px",
    borderRadius: "0",
    borderBottom: "1px solid #cccccc",
    borderTop: "1px solid #cccccc",
    borderRight: "1px solid #cccccc",
    height: "100%"
  },
  minWidth: {
    minWidth: "auto"
  },
  opacity: {
    opacity: 0.3
  }
});

Bucket.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Bucket);
