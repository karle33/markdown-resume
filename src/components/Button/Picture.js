import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import picture from "../../icons/picture.svg";

import {
  ENTER_DELAY,
  LEAVE_DELAY,
  IMAGE_MAX_SIZE,
  IMAGE_TYPES
} from "../../utils/constant";

import { observer, inject } from "mobx-react";

@inject("navbar")
@inject("resume")
@inject("hint")
@observer
class Picture extends Component {
  /**
   * 上传图片
   */
  uploadPicture = ({ target }) => {
    const file = target.files[0];
    target.value = "";

    if (!file) {
      return;
    }
    if (!IMAGE_TYPES.includes(file.type)) {
      this.props.hint.setError({
        isOpen: true,
        message: "仅支持 JPG、PNG、GIF 或 WebP 图片"
      });
      return;
    }
    if (file.size > IMAGE_MAX_SIZE) {
      this.props.hint.setError({
        isOpen: true,
        message: "图片不能超过 2 MB"
      });
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      this.props.hint.setError({ isOpen: true, message: "图片读取失败" });
    };
    reader.onload = () => {
      try {
        this.props.resume.setPicture(reader.result);
        this.props.hint.setSuccess({ isOpen: true, message: "图片已添加" });
      } catch (error) {
        this.props.hint.setError({
          isOpen: true,
          message: error.name === "QuotaExceededError"
            ? "图片过大，浏览器存储空间不足"
            : error.message || "图片添加失败"
        });
      }
    };
    reader.readAsDataURL(file);
  };

  stopPropagation = event => {
    event.stopPropagation();
  };

  render() {
    const { classes } = this.props;

    return (
      <Tooltip
        title="图片"
        placement="bottom"
        enterDelay={ENTER_DELAY}
        leaveDelay={LEAVE_DELAY}
        disableFocusListener
      >
        <Button
          className={classes.btn}
          disabled={this.props.navbar.isDisabled}
          onClick={this.stopPropagation}
          classes={{
            root: classes.minWidth,
            disabled: classes.opacity
          }}
        >
          <input
            accept="image/*"
            className={classes.input}
            id="uploadImage"
            onChange={this.uploadPicture}
            type="file"
          />
          <label htmlFor="uploadImage" className={classes.label}>
            <img src={picture} alt="logo" />
          </label>
        </Button>
      </Tooltip>
    );
  }
}

const styles = theme => ({
  input: {
    display: "none",
    width: "100%"
  },
  label: {
    display: "flex",
    height: "100%",
    padding: "6px 10px"
  },
  btn: {
    padding: "0px",
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

Picture.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Picture);
