
var COMMON = function () {

}

COMMON.prototype.setElementText = function (element, sText) {
    var sOldText = "";

    try {
        if (FCommon.UI.isValidObject(element.innerText) == true) {
            sOldText = element.innerText;
            element.innerText = sText;
        }
        else if (FCommon.UI.isValidObject(element.textContent) == true) { // Mozila
            sOldText = element.textContent;
            element.textContent = sText;
        }
    }
    catch (err) {
        err.message = "Exception: {setElementText} " + err.message;
        throw err;
    }

    return (sOldText);
};

COMMON.prototype.getTableColumnAlignText = function (value) {
    var sText = "";

    try {
        if (FCommon.UI.isValidObject(value) == false) {
            return ("left");
        }

        sText = value.toLowerCase();
        if (sText != "center" && sText != "right") {
            sText = "left";
        }
    }
    catch (err) {
        err.message = "Exception: {getTableColumnAlignText} " + err.message;
        throw err;
    }

    return (sText);
};

COMMON.prototype.getEmptyResultObject = function () {
    var obj = {};

    obj.lValue = null;
    obj.sValue = "";
    obj.data = null;

    return (obj);
};

COMMON.prototype.getObjectFirstPropertyValue = function (obj, bIgnoreBlankKey) {
    var value = "";
    var bIgnore = false;

    try {

        if (FCommon.UI.isValidObject(obj) == true) {
            if (FCommon.UI.isValidObject(bIgnoreBlankKey) == true) {
                bIgnore = bIgnoreBlankKey;
            }

            for (skey in obj) {
                if (bIgnore == false || FCommon.String.isNullOrEmpty(skey) == false) {
                    value = obj[skey];
                    break;
                }
            }
        }
    }
    catch (err) {
        alert("Exception: {getObjectFirstPropertyValue} " + err.message);
    }

    return (value);
};

var FCommon = new function () {
    this.String = new function () {

        this.left = function (sValue, iCount) {
            var sResult = "";
            debugger
            try {
                if (FCommon.String.isNullOrEmpty(sValue) == true) {
                    return ("");
                }

                if (FCommon.UI.isValidObject(iCount) == false
                    || COMMON.prototype.isInteger(iCount) == false) {
                    return (sValue);
                }

                iCount = parseInt(iCount);

                if (sValue.length < iCount) {
                    return ("");
                }

                sResult = sValue.substr(0, iCount);
            }
            catch (err) {
                alert("Exception: {FCommon.String.left} " + err.message);
            }

            return (sResult);
        },

        this.removeSpace = function (sValue) {
            try {
                if (FCommon.UI.isValidObject(sValue) == false) {
                    return (null);
                }

                sValue = sValue.replace(/\s+/g, '');
            }
            catch (err) {
                err.message = "Exception: {FCommon.String.removeSpace} " + err.message;
                throw err;
            }

            return (sValue);
        },

        this.isNullOrEmpty = function (sValue, bTrim) {
            var bResult = false;
            try {
                if (FCommon.UI.isValidObject(sValue) == false || sValue == null || sValue == "" || sValue.length <= 0) {
                    bResult = true;
                }

                if (FCommon.UI.isValidObject(bTrim) == true && bTrim == true) {
                    if ((typeof sValue).toLowerCase() == "string" && sValue.trim().length == 0) {
                        return (true);
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.String.isNullOrEmpty} " + err.message);
                bResult = true;
            }

            return (bResult);
        },

        this.compare = function (sValue, sValue1, bIgnoreCase, iLength) {
            var iResult = 0;

            try {
                if (FCommon.UI.isValidObject(bIgnoreCase) == false || bIgnoreCase == false) {
                    if (FCommon.UI.isValidObject(iLength) == false || iLength <= 0) {
                        iResult = sValue.localeCompare(sValue1);
                    }
                    else {
                        iResult = sValue.substr(0, iLength).localeCompare(sValue1.substr(0, iLength));
                    }
                }
                else {
                    if (FCommon.UI.isValidObject(iLength) == false || iLength <= 0) {
                        iResult = sValue.toLowerCase().localeCompare(sValue1.toLowerCase());
                    }
                    else {
                        iResult = sValue.substr(0, iLength).toLowerCase().localeCompare(sValue1.substr(0, iLength).toLowerCase());
                    }
                }
            }
            catch (err) {
                err.message = "Exception: {FCommon.String.compare} " + err.message;
                throw err;
            }

            return (iResult);
        },

            this.left = function (sValue, iIndex) {
                try {
                    if (iIndex > sValue.length) {
                        return (sValue);
                    }

                    sValue = sValue.substr(0, iIndex);
                }
                catch (err) {
                    err.message = "Exception: {FCommon.String.left} " + err.message;
                }

                return (sValue);
            }
    },

    this.UI = new function () {
        this.isValidObject = function (obj) {
            try {
                if (typeof obj == "undefined" || obj == null) {
                    return (false);
                }

                return (true);
            }
            catch (err) {
                alert("Exception: {FCommon.UI.isValidObject} " + err.message);
            }

            return (false);
        },

        this.calculateElementFixedLeftPosition = function (ele) {
            var iValue = 0;
            var rect = null;
            var rectParent = null;
            var sPosition = "";

            try {
                ele = FCommon.UI.getValidElement(ele);
                while (FCommon.UI.isValidObject(ele) == true) {
                    rect = ele.getBoundingClientRect();

                    ele = ele.parentElement;
                    if (FCommon.UI.isValidObject(ele) == true) {
                        sPosition = FCommon.UI.getElementStyleValue(ele, "position");
                        if (sPosition == "fixed") {
                            break;
                        }

                        rectParent = ele.getBoundingClientRect();
                        iValue += (rect.left - rectParent.left);
                    }
                    else {
                        iValue += rect.left;
                        break;
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.calculateElementFixedLeftPosition} " + err.message);
            }

            return (iValue);
        },

        this.calculateElementFixedTopPosition = function (ele) {
            var iValue = 0;
            var rect = null;
            var rectParent = null;
            var sPosition = "";

            try {
                ele = FCommon.UI.getValidElement(ele);
                while (FCommon.UI.isValidObject(ele) == true) {
                    rect = ele.getBoundingClientRect();

                    ele = ele.parentElement;
                    if (FCommon.UI.isValidObject(ele) == true) {
                        sPosition = FCommon.UI.getElementStyleValue(ele, "position");
                        if (sPosition == "fixed") {
                            break;
                        }

                        rectParent = ele.getBoundingClientRect();
                        iValue += (rect.top - rectParent.top);
                    }
                    else {
                        iValue += rect.top;
                        break;
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.calculateElementFixedTopPosition} " + err.message);
            }

            return (iValue);
        },

        this.getValidElement = function (obj) {
            var element = null;

            try {
                if (FCommon.UI.isValidObject(obj) == false) {
                    return (null);
                }

                if ((typeof obj).toLowerCase() == 'string') {
                    element = document.getElementById(obj);
                }
                else if ((typeof obj).toLowerCase() == 'object') {
                    element = obj;
                }
            }
            catch (err) {
                err.message = "Exception: {FCommon.UI.getValidElement} " + err.message;
                throw err;
            }

            return (element);
        },

        this.isSameElement = function (ele1, ele2) {
            try {
                if (ele1.isSameNode) {
                    if (ele1.isSameNode(ele2) == true) {
                        return (true);
                    }
                }
                else if (ele1.isEqualNode) {
                    if (ele1.isEqualNode(ele2) == true) {
                        return (true);
                    }
                }
                else if (ele1 === ele2) {
                    return (true);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.isSameElement} " + err.message);
            }

            return (false);
        },

        this.getWidth = function (element) {
            var rect = null;
            var iValue = 0;

            try {
                if (FCommon.UI.isValidObject(element) == true) {
                    rect = element.getBoundingClientRect();
                    iValue = rect.right - rect.left;
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.getWidth} " + err.message);
            }

            return (iValue);
        },

        this.replaceSelectionRange = function (eleCtrl, sValue, evt) {
            var sNewValue = "";
            var iSelectionStart = 0;
            var iSelectionEnd = 0;

            try {
                if (FCommon.UI.isValidObject(eleCtrl.selectionStart) == true) {
                    iSelectionStart = eleCtrl.selectionStart;
                    iSelectionEnd = eleCtrl.selectionEnd;
                    if (iSelectionStart > 0) {
                        sNewValue = FCommon.String.left(eleCtrl.value, iSelectionStart);
                        sNewValue += sValue;
                        sNewValue += eleCtrl.value.substr(iSelectionEnd);

                        if (FCommon.UI.isValidObject(evt) == true) {
                            FCommon.UI.stopKeyProcess(evt);
                            eleCtrl.value = sNewValue;
                            FCommon.UI.selectTextInInput(eleCtrl, iSelectionStart + 1, iSelectionEnd + 1);
                        }
                    }
                    else if (iSelectionEnd > 0) {
                        sNewValue = sValue;
                        sNewValue += eleCtrl.value.substr(iSelectionEnd);

                        if (FCommon.UI.isValidObject(evt) == true) {
                            FCommon.UI.stopKeyProcess(evt);
                            eleCtrl.value = sNewValue;
                            FCommon.UI.selectTextInInput(eleCtrl, 1, 1);
                        }
                    }
                    else {
                        sNewValue = eleCtrl.value;
                        sNewValue += sValue;
                    }
                }
                else {
                    sNewValue = eleCtrl.value + sValue;
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.replaceSelectionRange} " + err.message);
            }

            return (sNewValue);
        },

        this.createAttributesFromObject = function (element, obj) {
            var iCounter = 0;
            var sKey = "";
            var keys = null;

            try {
                keys = Object.keys(obj);
                for (iCounter = 0; iCounter < keys.length; iCounter++) {
                    sKey = keys[iCounter];
                    if (FCommon.String.isNullOrEmpty(sKey) == true) {
                        continue;
                    }

                    element.setAttribute("data-" + sKey, obj[sKey]);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.createAttributesFromObject} " + err.message);
            }
        },

        this.createAttributesFromArray = function (element, data) {
            var iCounter = 0;

            try {
                for (iCounter = 0; iCounter < data.length; iCounter++) {
                    FCommon.UI.createAttributesFromObject(element, data[iCounter]);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.createAttributesFromArray} " + err.message);
            }
        },

        this.setAttributeData = function (element, key, value) {
            try {
                element = FCommon.UI.getValidElement(element);
                if (FCommon.UI.isValidObject(element) == false) {
                    return;
                }

                if (FCommon.UI.isValidObject(key) == false) {
                    return;
                }

                if (FCommon.UI.isValidObject(value) == false) {
                    if (FCommon.Array.isArray(key) == true) {
                        FCommon.UI.createAttributesFromArray(element, key);
                    }
                    else if (FConvert.isObject(key) == true) {
                        FCommon.UI.createAttributesFromObject(element, key);
                    }
                }
                else {
                    element.setAttribute("data-" + FCommon.String.removeSpace(key), value);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.setAttributeData} " + err.message);
            }
        },

        this.getAttributeData = function (element, key) {
            var value = null;

            try {
                element = FCommon.UI.getValidElement(element);
                if (FCommon.UI.isValidObject(element) == true) {
                    if (FCommon.String.left(key, "data-".length) != "data-") {
                        key = "data-" + key;
                    }

                    value = element.getAttribute(key);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.getAttributeData} " + err.message);
            }

            return (value);
        },

        this.selectTextInInput = function (control, iStart, iEnd) {
            try {
                control = FCommon.UI.getValidElement(control);
                if (FCommon.UI.isValidObject(control) == false) {
                    return;
                }

                if (control.setSelectionRange) {
                    control.focus();
                    control.setSelectionRange(iStart, iEnd);
                }
                else if (control.createTextRange) {
                    var range = control.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', iEnd);
                    range.moveStart('character', iStart);
                    range.select();
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.selectTextInInput} " + err.message);
            }
        },

        this.unselectTextInInput = function (eleInput) {
            try {
                eleInput = FCommon.UI.getValidElement(eleInput);
                if (FCommon.UI.isValidObject(eleInput) == true) {
                    FCommon.UI.selectTextInInput(eleInput, eleInput.value.length, eleInput.value.length);
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.unselectTextInInput} " + err.message);
            }
        },

        this.hasScrollBar = function (element) {
            var obj = {};

            try {
                obj.horizontal = false;
                obj.vertical = false;
                obj.scrollbarwidth = 0;
                obj.scrollbarheight = 0;

                if (FCommon.UI.isValidObject(element) == false) {
                    return (obj);
                }

                obj.vertical = (element.scrollHeight > element.clientHeight);
                obj.horizontal = (element.scrollWidth > element.clientWidth);
                obj.scrollbarwidth = (element.offsetWidth - element.clientWidth);
                obj.scrollbarheight = (element.offsetHeight - element.clientHeight);
            }
            catch (err) {
                alert("Exception: {FCommon.UI.hasScrollBar} " + err.message);
            }

            return (obj);
        },

        this.getScrollLeft = function (element, bFirstOnly) {
            var iLeft = 0;
            var obj = null;

            try {
                bFirstOnly = FConvert.toBoolean(bFirstOnly);
                while (FCommon.UI.isValidObject(element) == true) {
                    obj = FCommon.UI.hasScrollBar(element);
                    if (obj.horizontal == true) {
                        iLeft += element.scrollLeft;
                        if (bFirstOnly == true) {
                            break;
                        }
                    }

                    element = element.parentElement;
                }
            }
            catch (err) {
            }

            return (iLeft);
        },

        this.getScrollTop = function (element, bFirstOnly) {
            var iTop = 0;
            var obj = null;

            try {
                bFirstOnly = FConvert.toBoolean(bFirstOnly);
                while (FCommon.UI.isValidObject(element) == true) {
                    obj = FCommon.UI.hasScrollBar(element);
                    if (obj.vertical == true) {
                        iTop += element.scrollTop;
                        if (bFirstOnly == true) {
                            break;
                        }
                    }

                    element = element.parentElement;
                }
            }
            catch (err) {
            }

            return (iTop);
        },

        this.removeDataAttribute = function (element) {
            var sName = "";
            var iAttrCounter = 0;

            try {
                while (iAttrCounter < element.attributes.length) {
                    sName = element.attributes[iAttrCounter].name;
                    if (FCommon.String.left(sName, "data-".length) == "data-") {
                        element.removeAttribute(sName);
                        continue;
                    }

                    iAttrCounter++
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.removeDataAttribute} " + err.message);
            }
        },

        this.getElementStyleValue = function (element, sStyleName) {
            var value = "";

            try {
                element = FCommon.UI.getValidElement(element);
                if (FCommon.UI.isValidObject(element) == true) {
                    if (window.getComputedStyle) {
                        value = window.getComputedStyle(element, null).getPropertyValue(sStyleName);
                    }
                    else if (element.currentStyle) {
                        value = element.currentStyle[sStyleName];
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.getElementStyleValue} " + err.message);
            }

            return (value);
        },

        this.getVisibleWidthHeight = function (ele) {
            var iValue = 0;
            var iTemp = 0;
            var rectElement = null;
            var rectContainer = null;
            var obj = null;

            try {
                obj = {};
                obj.iWidth = 0;
                obj.iHeight = 0;
                obj.iVisibleWidth = 0;
                obj.iVisibleHeight = 0;

                ele = FCommon.UI.getValidElement(ele);
                if (FCommon.UI.isValidObject(ele) == false) {
                    return (obj);
                }

                rectElement = ele.getBoundingClientRect();
                obj.iWidth = rectElement.width;
                obj.iHeight = rectElement.height;
                obj.iVisibleWidth = obj.iWidth;
                obj.iVisibleHeight = obj.iHeight;

                do {
                    ele = ele.parentElement;
                    if (FCommon.UI.isValidObject(ele) == false) {
                        break;
                    }

                    rectContainer = ele.getBoundingClientRect();

                    //if (ele.scrollLeft > 0) {                        
                    //    if (rectContainer.left > rectElement.left) {
                    //        iTemp = rectElement.width - (rectContainer.left - rectElement.left);
                    //        if (iTemp < obj.iVisibleWidth) {
                    //            obj.iVisibleWidth = iTemp;
                    //        }
                    //    }
                    //}

                    //if (ele.scrollTop > 0) {
                    //    if (rectContainer.top > rectElement.top) {
                    //        iTemp = rectElement.height - (rectContainer.top - rectElement.top);
                    //        if (iTemp < obj.iVisibleHeight) {
                    //            obj.iVisibleHeight = iTemp;
                    //        }
                    //    }
                    //}

                    if (rectContainer.width < ele.scrollWidth) {
                        if (rectElement.left >= rectContainer.left && rectElement.right <= rectContainer.right) {
                            iTemp = obj.iVisibleWidth;
                        }
                        else if (rectElement.left <= rectContainer.left) {
                            iTemp = rectElement.width - (rectContainer.left - rectElement.left);
                        }
                        else if (rectElement.right >= rectContainer.right) {
                            iTemp = rectElement.width - (rectElement.right - rectContainer.right);
                        }

                        if (iTemp < obj.iVisibleWidth) {
                            obj.iVisibleWidth = iTemp;
                        }
                    }


                    if (rectContainer.height < ele.scrollHeight) {
                        if (rectElement.top >= rectContainer.top && rectElement.bottom <= rectContainer.bottom) {
                            iTemp = obj.iVisibleHeight;
                        }
                        else if (rectElement.top <= rectContainer.top) {
                            iTemp = rectElement.height - (rectContainer.top - rectElement.top);
                        }
                        else if (rectElement.bottom >= rectContainer.bottom) {
                            iTemp = rectElement.height - (rectElement.bottom - rectContainer.bottom);
                        }

                        if (iTemp < obj.iVisibleHeight) {
                            obj.iVisibleHeight = iTemp;
                        }
                    }
                } while (true);
            }
            catch (err) {
                alert("Exception: {FCommon.UI.getVisibleWidthHeight} " + err.message);
            }

            return (obj);
        },

        this.setFocusDropdownPopupPosition = function (eleInput, elePopup) {
            var iValue = 0;
            var iInputTop = 0;
            var iPopupWidth = 0;
            var iInputWidth = 0;
            var rectPopup = null;
            var rectInput = null;
            var arrValue = null;

            try {
                if (FCommon.UI.isValidObject(eleInput) == false || FCommon.UI.isValidObject(elePopup) == false) {
                    return;
                }

                elePopup.style.position = "fixed";

                rectPopup = elePopup.getBoundingClientRect();
                iPopupWidth = (rectPopup.right - rectPopup.left);

                rectInput = eleInput.getBoundingClientRect();
                iInputWidth = rectInput.right - rectInput.left;

                iInputTop = FCommon.UI.calculateElementFixedTopPosition(eleInput);
                if ((iInputTop + rectInput.height + rectPopup.height) >= window.innerHeight) {
                    iValue = iInputTop - rectPopup.height;
                }
                else {
                    iValue = iInputTop + rectInput.height;
                }
                elePopup.style.top = iValue + "px";

                //if (rectPopup.bottom >= window.innerHeight) {
                //    iValue = (rectPopup.top - rectPopup.height) - eleInput.getBoundingClientRect().height;
                //    elePopup.style.top = iValue + "px";
                //}
                //else {
                //    elePopup.style.top = FCommon.UI.calculateElementFixedTopPosition(eleInput) + rectInput.height + "px";
                //}

                iValue = FCommon.UI.calculateElementFixedLeftPosition(eleInput);
                if (FCommon.UI.getElementStyleValue(eleInput, "direction").toLowerCase() == "rtl") {
                    //rectInput = eleInput.getBoundingClientRect();
                    //if (rectPopup.width > rectInput.width) {
                    //    arrValue = elePopup.style.left.split("px");
                    //    if (FCommon.UI.isValidObject(arrValue) == true && arrValue.length > 0) {
                    //        iValue = FConvert.toInt(arrValue[0]);
                    //    }

                    //    if (iValue > 0) {
                    //        elePopup.style.left = iValue - (rectPopup.width - rectInput.width) + "px";
                    //    }                    
                    //}

                    iInputWidth = rectInput.right - rectInput.left;

                    if (iPopupWidth >= iInputWidth) {
                        iValue -= (iPopupWidth - iInputWidth);
                    }
                    else {
                        iValue += (iInputWidth - iPopupWidth);
                    }

                    if ((iValue + iPopupWidth) < iPopupWidth) {
                        iValue += (iPopupWidth - iInputWidth);
                    }
                }
                else {
                    if ((iValue + iPopupWidth) > window.innerWidth) {
                        iValue -= (iPopupWidth - iInputWidth);
                    }
                }

                elePopup.style.left = iValue + "px";
            }
            catch (err) {
                alert("Exception: {FCommon.UI.setFocusDropdownPopupPosition} " + err.message);
            }
        },

        this.stopKeyProcess = function (evt) {
            try {
                if (FCommon.UI.isValidObject(evt) == false) {
                    return;
                }

                if (evt.preventDefault) {
                    evt.preventDefault();
                }
                else {
                    evt.returnValue = false;
                }

                if (evt.bubbles == true) {
                    evt.stopPropagation();
                }
            }
            catch (err) {
                alert("Exception: {FCommon.UI.stopKeyProcess} " + err.message);
            }
        }
    },

    this.Array = new function () {
        this.isArray = function (arrData) {
            var bValue = false;

            try {
                if (FCommon.UI.isValidObject(arrData) == true) {
                    if (Array.isArray(arrData) == true) {
                        bValue = true;
                    }
                }
            }
            catch (err) {
                alert("Exception: {FCommon.Array.isArray} " + err.message);
            }

            return (bValue);
        },

        this.getLength = function (arrData) {
            var iValue = 0;

            try {
                if (FCommon.Array.isArray(arrData) == true) {
                    iValue = arrData.length;
                }
            }
            catch (err) {
                alert("Exception: {FCommon.Array.getLength} " + err.message);
            }

            return (iValue);
        }
    }
}();

var FConvert = new function () {
    this.isInteger = function (sValue) {
        var patt = null;
        var result = false;

        try {
            if (FCommon.String.isNullOrEmpty(sValue) == true) {
                return (false);
            }

            patt = /^[+-]?\d+$/;
            result = patt.test(sValue);
        }
        catch (err) {
            alert("Exception: {FConvert.isInteger} " + err.message);
        }

        return (result);
    },

    this.isBoolean = function (value) {
        var bResult = false;

        if ((typeof value).toLowerCase() == "boolean") {
            bResult = true;
        }

        return (bResult);
    },

    this.isString = function (value) {
        var bResult = false;

        if ((typeof value).toLowerCase() == "string") {
            bResult = true;
        }

        return (bResult);
    },

    this.isObject = function (value) {
        var bResult = false;

        if ((typeof value).toLowerCase() == "object" && value != null) {
            bResult = true;
        }

        return (bResult);
    },

    this.toInt = function (value) {
        if (FCommon.UI.isValidObject(value) == false) {
            return (0);
        }

        value = parseInt(value);
        if (isNaN(value) == true) {
            return (0);
        }

        return (value);
    },

    this.toBoolean = function (value) {
        if (FCommon.UI.isValidObject(value) == false) {
            return (false);
        }

        if (FConvert.isString(value) == true) {
            if (FCommon.String.isNullOrEmpty(value) == true) {
                return (false);
            }

            if (value.toLowerCase().trim() == "true" || value == "1") {
                return (true);
            }
        }
        else if (FConvert.isBoolean(value) == true) {
            return (eval(value));
        }
        else if ((typeof value).toLowerCase() == "number") {
            if (FConvert.toInt(value) > 0) {
                return (true);
            }
        }

        return (false);
    },

    this.toString = function (value) {
        var sType = "";

        if (FCommon.UI.isValidObject(value) == false) {
            return ("");
        }

        if (FConvert.isString(value) == true) {
            return (value);
        }
        else if (FConvert.isBoolean(value) == true) {
            value = value.toString();
        }
        else if (FConvert.isObject(value) == true) {
            value = JSON.stringify(value);
        }
        else {
            sType = (typeof value).toLowerCase();
            if (sType == "number") {
                value = value.toString();
            }
            else {
                value = "";
            }
        }

        return (value);
    }
}();

var NETWORK = new function () {
    this.createParameterForHTTPPostRequest = function (sVariable, sValue, sExistingParameter) {
        try {
            if (FCommon.String.isNullOrEmpty(sExistingParameter) == false) {
                sExistingParameter += "&";
            }

            sExistingParameter += sVariable + "=" + encodeURIComponent(sValue);
        }
        catch (err) {
            err.message = "Exception: {NETWORK.createParameterForHTTPPostRequest} " + err.message;
            throw err;
        }

        return (sExistingParameter);
    }
}();


///////////////////////////////////////////////////////////
var OPTIONCONTROL = new function () {
    this.isInvalidkeyCode = function (keyCode) {
        try {
            switch (keyCode) {
                case 9: // Tab key
                case 10: // Enter key
                case 13: // Enter key
                    //case 27: // Escape key
                case 33: // Page up
                case 34: // Page down
                    //case 35: // End key
                    //case 36: // Home key
                case 37: // left arrow
                    //case 38: // up arrow
                case 39: // right arrow
                    //case 40: // down arrow
                case 44: // Print screen key
                case 45: // Insert key
                    return (true);
            }
        }
        catch (err) {
            err.message = "Exception: {isInvalidkeyCode} " + err.message;
            throw err;
        }

        return (false);
    },

    this.keypress = function (id, event, sURL) {
        var sValue = "";

        try {
            sValue = id.value;

            if (FCommon.UI.isValidObject(event.keyCode) == true && OPTIONCONTROL.isInvalidkeyCode(event.keyCode) == true) {
                return;
            }
            else if (FCommon.UI.isValidObject(event.charCode) == true && event.charCode) {
                sValue = FCommon.UI.replaceSelectionRange(id, String.fromCharCode(event.charCode), event);
            }
            else {
                //sValue = FCommon.UI.replaceSelectionRange(id, String.fromCharCode(event.keyCode), event);
                sValue += String.fromCharCode(event.keyCode);
            }

            OPTIONCONTROL.processInputs(id, sValue, sURL, OPTIONCONTROL.getElementData(OPTIONCONTROL.getSelectedRow(id), id));

            //if (OPTIONCONTROL.isPopupVisible(id, true) == false) {
            //    OPTIONCONTROL.showPopup(id, true);
            //}
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.keypress} " + err.message);
        }
    },

    this.input = function (id, event, sURL) {
        var sValue = "";

        try {
            sValue = FConvert.toString(id.value);

            OPTIONCONTROL.processInputs(id,
                                        sValue,
                                        sURL,
                                        OPTIONCONTROL.getElementData(OPTIONCONTROL.getSelectedRow(id), id));
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.input} " + err.message);
        }
    },

    this.keydown = function (id, evt, sURL) {
        var sValue = "";
        var sCallback = "";
        var bResult = false;
        var objCtrl = null;
        var bFlag = false;

        try {
            sCallback = OPTIONCONTROL.getOnKeyDownCallback(id);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                bResult = FConvert.toBoolean(eval(sCallback)(id, evt));
                if (bResult == true) {
                    return;
                }
            }

            switch (evt.keyCode) {
                case 9:
                    objCtrl = OPTIONCONTROL.getSelectedRow(id);
                    OPTIONCONTROL.setSelectedValue(id);
                    break;
                case 13:
                    for (id = id.nextElementSibling; id != null; id = id.nextElementSibling) {
                        alert(id.tagName);
                    }
                    break;
                case 27: // Esc key
                    FCommon.UI.stopKeyProcess(evt);
                    OPTIONCONTROL.unselectRow(OPTIONCONTROL.getSelectedRow(id));
                    return;
                case 35: // End key
                    FCommon.UI.stopKeyProcess(evt);
                    OPTIONCONTROL.selectLastRow(id);
                    break;
                case 36: // Home key
                    FCommon.UI.stopKeyProcess(evt);
                    OPTIONCONTROL.selectFirstRow(id);
                    break;
                case 38: // up arrow
                    OPTIONCONTROL.processUpKey(id, evt);
                    break;
                case 40: // down arrow
                    OPTIONCONTROL.processDownKey(id, evt, sURL);
                    break;
            }
        }
        catch (err) {
            alert("Exception: {keydown} " + err.message);
        }
    },

    this.keyup = function (id, event, sURL) {
        var sValue = "";
        var row = null;

        try {
            switch (event.keyCode) {
                case 8: // backspace key
                    sValue = id.value;
                    row = OPTIONCONTROL.getSelectedRow(id);
                    OPTIONCONTROL.processInputs(id, sValue, sURL, OPTIONCONTROL.getElementData(row));
                    if (FCommon.String.isNullOrEmpty(sValue) == false && OPTIONCONTROL.isPopupVisible(id, true) == false) {
                        OPTIONCONTROL.showPopup(id, true);
                    }
                    return;
                case 13: // Enter key
                    break;
                case 16: // Shift key
                    return;
                case 19: // Pause key
                    return;
                case 32: // Space bar
                    break;
                case 33: // Page up
                    break;
                case 34: // Page down
                    break;
                case 37: // left arrow
                    break;
                case 38: // up arrow
                    return;
                case 39: // right arrow
                    break;
                case 40: // down arrow
                    return;
                case 44: // Print screen key
                    return;
                case 45: // Insert key
                    return;
                case 46: // Delete key
                    sValue = id.value;
                    OPTIONCONTROL.processInputs(id, sValue, sURL, null);
                    if (FCommon.String.isNullOrEmpty(sValue) == false && OPTIONCONTROL.isPopupVisible(id, true) == false) {
                        OPTIONCONTROL.showPopup(id, true);
                    }
                    break;
                case 106: // Numeric pad * key
                    break;
                case 107: // Numeric pad + key
                    break;
                case 109: // Numeric pad - key
                    break;
                case 110: // Numeric pad . key
                    break;
                case 111: // Numeric pad / key
                    break;
                case 144: // Num Lock key
                    return;
                case 145: // Scroll Lock key
                    return;
                case 186: // ; : key
                    break;
                case 187: // = + key
                    break;
                case 188: // , < key
                    break;
                case 189: // - _ key
                    break;
                case 190: //. > key
                    break;
                case 191: // / ? key
                    break;
                case 192: // ` ~ key
                    return;
                case 219: //[ { key
                    break;
                case 220: // \ | key
                    break;
                case 221: // ] } key
                    break;
                case 222: // ' " key
                    break;
                default:
                    if (event.keyCode >= 96 && event.keyCode <= 105) { // Numeric pad number 0 to 9
                    }
                    else if (event.keyCode >= 48 && event.keyCode <= 57) { // Number key 0 to 9
                    }
                    else if (event.keyCode >= 65 && event.keyCode <= 90) { // key a to z in both case

                    }

                    break;
            }
        }
        catch (err) {
            alert("Exception: {keyup} " + err.message);
        }
    },

    this.processInputs = function (id, sKey, sURL, objData) {
        var arrIndex = null;
        var vValue = null;
        var row = null;
        var objParam = null;

        try {
            if (OPTIONCONTROL.isKeepUnmatchedData(id) == true) {
                if (FCommon.String.isNullOrEmpty(sKey) == true) {
                    OPTIONCONTROL.clearControlData(id);
                }
            }
            else {
                if (OPTIONCONTROL.isValidStoredData(id, sKey) == false) {
                    OPTIONCONTROL.clear(id, true);

                    if (FCommon.UI.isValidObject(objData) == true) {
                        objData = null;
                    }
                }
            }

            arrIndex = OPTIONCONTROL.getKeyDataIndexArray(id, sKey, 0);
            if (FCommon.String.isNullOrEmpty(sURL) == false && (arrIndex == null || arrIndex.length <= 0)) {
                objParam = OPTIONCONTROL.getServerCommunicationParameterObject(id, sURL);
                objParam.sSearch = sKey;
                OPTIONCONTROL.getDataFromServer(objParam);
            }
            else {
                OPTIONCONTROL.fillDataFromIndex(id, OPTIONCONTROL.getMetaData(id), arrIndex);
                if (FCommon.UI.isValidObject(objData) == true) {
                    row = OPTIONCONTROL.getRowFromObject(id, objData);
                    if (row != null) {
                        OPTIONCONTROL.selectRow(row, id);
                    }
                    else {
                        OPTIONCONTROL.selectFirstRow(id);
                    }
                }
                else {
                    OPTIONCONTROL.selectFirstRow(id);
                }
            }

            if (OPTIONCONTROL.isPopupVisible(id, true) == false) {
                OPTIONCONTROL.showPopup(id, true);
            }
        }
        catch (err) {
            err.message = "Exception: {processInputs} " + err.message;
            throw err;
        }
    },

    this.getServerCommunicationParameterObject = function (id, sURL) {
        var obj = {};

        obj.id = id;
        obj.sURL = sURL;
        obj.sSearch = "";
        obj.iExistingDataCount = 0;
        obj.SelectedData = null;
        obj.sFilter = "";
        obj.tag = null;
        obj.bAsync = false;
        obj.bLoadAll = false;
        obj.bIgnoreChangeCallback = false;

        return (obj);
    },

    this.getDataFromServer = function (obj) {
        var element = null;
        var value = null;
        var parameter = "";
        var sExistingFilter = "";

        try {
            element = document.getElementById(obj.id.id);

            value = FCommon.UI.getAttributeData(element, "mastertypeid");
            parameter = NETWORK.createParameterForHTTPPostRequest("iMasterTypeId", value, parameter);

            value = FCommon.UI.getAttributeData(element, "grouptype");
            parameter = NETWORK.createParameterForHTTPPostRequest("iGroupType", value, parameter);

            sExistingFilter = FCommon.UI.getAttributeData(element, "filter");
            if (FCommon.String.isNullOrEmpty(obj.sFilter, true) == false) {
                if (FCommon.String.isNullOrEmpty(sExistingFilter) == false) {
                    obj.sFilter = sExistingFilter + " AND " + obj.sFilter;
                }

                parameter = NETWORK.createParameterForHTTPPostRequest("sFilter", obj.sFilter, parameter);
            }
            else {
                value = sExistingFilter;
                parameter = NETWORK.createParameterForHTTPPostRequest("sFilter", value, parameter);
            }

            parameter = NETWORK.createParameterForHTTPPostRequest("sSearchKey", obj.sSearch, parameter);
            parameter = NETWORK.createParameterForHTTPPostRequest("iExistingDataCount", obj.iExistingDataCount, parameter);

            value = OPTIONCONTROL.getTableName(element);
            parameter = NETWORK.createParameterForHTTPPostRequest("sTableName", value, parameter);

            value = OPTIONCONTROL.getPrimaryField(element);
            parameter = NETWORK.createParameterForHTTPPostRequest("sPrimaryField", value, parameter);

            value = OPTIONCONTROL.getDisplayField(element);
            parameter = NETWORK.createParameterForHTTPPostRequest("sDisplayField", value, parameter);

            value = OPTIONCONTROL.getMandatoryFields(element);
            parameter = NETWORK.createParameterForHTTPPostRequest("sMandatoryFields", value, parameter);

            value = FConvert.toInt(FCommon.UI.getAttributeData(element, "i_UnitId"));
            if (value > 0) {
                parameter = NETWORK.createParameterForHTTPPostRequest("iUnitId", value, parameter);
            }

            value = FConvert.toInt(FCommon.UI.getAttributeData(element, "i_ItemId"));
            if (value > 0) {
                parameter = NETWORK.createParameterForHTTPPostRequest("iItemId", value, parameter);
            }

            value = FConvert.toInt(FCommon.UI.getAttributeData(element, "i_GroupId"));
            if (value > 0) {
                parameter = NETWORK.createParameterForHTTPPostRequest("iGroupId", value, parameter);
            }

            parameter = NETWORK.createParameterForHTTPPostRequest("bLoadAll", FConvert.toBoolean(obj.bLoadAll), parameter);

            $.ajax({
                url: obj.sURL,
                data: parameter,
                type: 'POST',
                traditional: true,
                async: obj.bAsync,
                success: function (data, textStatus, jqXHR) {
                    var objResponse = {};

                    try {
                        console.log("Success: {OPTIONCONTROL::getDataFromServer} [ControlId='" + obj.id.id + "'][textStatus='" + textStatus + "']");

                        objResponse.id = obj.id;
                        objResponse.data = data;
                        objResponse.sKey = obj.sSearch;
                        objResponse.objSelectedData = obj.SelectedData;
                        objResponse.bIgnoreChangeCallback = obj.bIgnoreChangeCallback;

                        if (FCommon.UI.isValidObject(obj.tag) == true) {
                            objResponse.tag = obj.tag;
                        }

                        OPTIONCONTROL.serverResponse(objResponse);
                    }
                    catch (err) {
                        console.log("Exception: {OPTIONCONTROL::getDataFromServer:success} [ControlId='" + obj.id.id + "'][Message='" + err.message + "']");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    try {
                        console.log("Error: {OPTIONCONTROL::getDataFromServer} [ControlId='" + obj.id.id + "'][textStatus='" + textStatus + "'][errorThrown='" + errorThrown + "']");
                    }
                    catch (err) {
                        console.log("Exception: {OPTIONCONTROL::getDataFromServer:error} [ControlId='" + obj.id.id + "'][Message='" + err.message + "']");
                    }
                }
            });
        }
        catch (err) {
            console.log("Exception: {OPTIONCONTROL::getDataFromServer} " + err.message);

            err.message = "Exception: {OPTIONCONTROL::getDataFromServer} " + err.message;
            throw err;
        }
    },

    this.serverResponse = function (objResponse) {
        var sCallback = "";
        var arrIndex = null;
        var row = null;
        var bRowSelected = false;
        var obj = {};
        //debugger;
        try {
            sCallback = OPTIONCONTROL.getOnDataLoadedCallback(objResponse.id);

            obj = OPTIONCONTROL.getCallbackDataObject(objResponse.id, objResponse.tag, false);
            obj.OldData = OPTIONCONTROL.getSelectedRowValue(objResponse.id);

            if (FCommon.String.isNullOrEmpty(objResponse.data.Error) == false) {
                throw new Error(objResponse.data.Error);
            }

            OPTIONCONTROL.setCompareValueIndex(objResponse.id, objResponse.data.CompareValueIndex);
            OPTIONCONTROL.setStoreValueIndex(objResponse.id, objResponse.data.StoreValueIndex);
            // debugger;
            if (OPTIONCONTROL.getMetaData(objResponse.id).length == 0) {
                // debugger;
                OPTIONCONTROL.createHeading(objResponse.id, objResponse.data.ColumnMetaData);
            }


            OPTIONCONTROL.storeDataArrayInMemory(objResponse.id, objResponse.data.ColumnValue);

            if (FCommon.String.isNullOrEmpty(objResponse.sKey) == false) // If any key typed or spacebar is pressed
            {
                arrIndex = OPTIONCONTROL.getKeyDataIndexArray(objResponse.id, objResponse.sKey, 0);
                if (FCommon.String.isNullOrEmpty(objResponse.sKey.trim()) == true) {
                    FCommon.UI.getValidElement(objResponse.id).value = "";
                }

                OPTIONCONTROL.fillDataFromIndex(objResponse.id, OPTIONCONTROL.getMetaData(objResponse.id), arrIndex);

                bRowSelected = false;
                if (FCommon.UI.isValidObject(objResponse.objSelectedData) == true) {
                    row = OPTIONCONTROL.getRowFromObject(objResponse.id, objResponse.objSelectedData);
                    if (FCommon.UI.isValidObject(row) == true) {
                        OPTIONCONTROL.selectRow(row, objResponse.id);
                        bRowSelected = true;
                    }
                }
                else {
                    OPTIONCONTROL.selectFirstRow(objResponse.id);
                    bRowSelected = true;
                }

                if (bRowSelected == true && FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    obj.Data = OPTIONCONTROL.getSelectedRowValue(objResponse.id);
                    obj.Flag.bLeave = false;
                    obj.Flag.bDataLoad = true;
                    obj.Flag.bDataChange = false;
                    eval(sCallback)(objResponse.id, obj.Data, obj);
                }
            }
            else if (FCommon.UI.isValidObject(objResponse.objSelectedData) == true) {
                if (OPTIONCONTROL.selectValueInControl(objResponse.id, objResponse.objSelectedData, objResponse.tag, objResponse.bIgnoreChangeCallback) == true) { // Called indirectly from setControlValue
                    //if (FCommon.String.isNullOrEmpty(sCallback) == false)
                    //{
                    //    obj.Data = OPTIONCONTROL.getControlData(objResponse.id);
                    //    obj.Flag.bLeave = false;
                    //    obj.Flag.bDataLoad = true;
                    //    obj.Flag.bDataChange = false;
                    //    eval(sCallback)(objResponse.id, obj.Data, obj);
                    //}
                }
                else {
                    if (FCommon.String.isNullOrEmpty(sCallback) == false) {
                        obj.Data = null;
                        obj.Flag.bLeave = false;
                        obj.Flag.bDataLoad = true;
                        obj.Flag.bDataChange = false;
                        eval(sCallback)(objResponse.id, null, obj);
                    }
                }
            }
            else {
                if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    obj.bDataArray = true;
                    obj.Data = objResponse.data.ColumnValue;
                    obj.Flag.bLeave = false;
                    obj.Flag.bDataLoad = true;
                    obj.Flag.bDataChange = false;
                    eval(sCallback)(objResponse.id, obj.Data, obj);
                }
            }
        }
        catch (err) {
            console.log("Exception: {OPTIONCONTROL::serverResponse} " + err.message);

            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                obj.Data = null;
                obj.Flag.bLeave = false;
                obj.Flag.bDataLoad = false;
                obj.Flag.bDataChange = false;
                eval(sCallback)(objResponse.id, null, obj);
            }

            err.message = "Exception: {serverResponse} " + err.message;
            throw err;
        }
    },

    this.createHeading = function (id, arrMetaData) {
        var parent = null;
        var iCounter = 0;
        var objData = null;
        var colGroup = null;
        var row = null;
        var element = null;
        var iWidth = 0;

        try {
            parent = OPTIONCONTROL.getDataTableHeadingElement(id);
            if (parent == null) {
                return (false);
            }

            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }

            if (FCommon.UI.isValidObject(arrMetaData) == false) {
                return;
            }

            window[OPTIONCONTROL.getMetaDataVariableName(id)] = arrMetaData;

            colGroup = document.createElement("colgroup");
            row = document.createElement("tr");

            for (iCounter = 0; iCounter < arrMetaData.length; iCounter++) {
                objData = arrMetaData[iCounter];
                if (objData.Hidden == true) {
                    continue;
                }

                iWidth += objData.Width;

                element = document.createElement("col");
                element.setAttribute("width", objData.Width);
                colGroup.appendChild(element);

                element = document.createElement("th");
                element.className = "option_heading theme_color";
                element.style.minWidth = objData.Width + "px";
                element.style.maxWidth = objData.Width + "px";
                element.style.position = "relative";
                element.style.borderRight = "solid 1px rgb(154, 198, 255)";
                // element.style.fontWeight = "bold";
                element.style.fontweight = "normal";
                element.style.paddingLeft = "3px";
                element.style.paddingRight = "3px";
                element.style.paddingTop = "1px";
                element.style.paddingBottom = "3px";
                element.style.overflow = "hidden";
                element.style.textOverflow = "ellipsis";
                element.style.whiteSpace = "nowrap";
                element.style.backgroundColor = "#C7DFFF";
                element.setAttribute("align", COMMON.prototype.getTableColumnAlignText(objData.Align));
                COMMON.prototype.setElementText(element, objData.Name);
                row.appendChild(element)
            }
            parent.appendChild(colGroup);

            element = document.createElement("thead");
            element.appendChild(row);
            parent.appendChild(element);

            OPTIONCONTROL.setDataContainerPosition(id);
        }
        catch (err) {
            err.message = "Exception: {createHeading} " + err.message;
            throw err;
        }
    },

    this.isTableDataColGroupExist = function (id) {
        var element = null;

        try {
            element = OPTIONCONTROL.getDataTableColGroupElement(id);
            if (FCommon.UI.isValidObject(element) == true) {
                return (true);
            }
        }
        catch (err) {
            err.message = "Exception: {isTableDataColGroupExist} " + err.message;
            throw err;
        }

        return (false);
    },

    this.createTableDataColGroup = function (id, arrMetaData) {
        var iCounter = 0;
        var parent = null;
        var colGroup = null;
        var element = null;
        var objColumnMetaData = null;

        try {
            if (FCommon.UI.isValidObject(arrMetaData) == false) {
                return (false);
            }

            colGroup = OPTIONCONTROL.getDataTableColGroupElement(id);
            if (FCommon.UI.isValidObject(colGroup) == true) {
                while (colGroup.firstChild) {
                    colGroup.removeChild(colGroup.firstChild);
                }
            }

            parent = OPTIONCONTROL.getDataTableElement(id);
            if (parent == null) {
                return (false);
            }

            if (FCommon.UI.isValidObject(colGroup) == false) {
                colGroup = document.createElement("colgroup");
                colGroup.id = OPTIONCONTROL.getDataColGroupId(id);
            }

            for (iCounter = 0; iCounter < arrMetaData.length; iCounter++) {
                objColumnMetaData = arrMetaData[iCounter];
                if (objColumnMetaData.Hidden == true) {
                    continue;
                }

                element = document.createElement("col");
                element.setAttribute("width", objColumnMetaData.Width);
                colGroup.appendChild(element);
            }
            parent.appendChild(colGroup);
        }
        catch (err) {
            err.message = "Exception: {createTableDataColGroup} " + err.message;
            throw err;
        }

        return (true);
    },

    this.getRowFromObject = function (id, objData) {
        var iCompareValueIndex = 0;
        var row = null;
        var obj = null;

        try {
            iCompareValueIndex = OPTIONCONTROL.getCompareValueIndex(id);
            for (row = OPTIONCONTROL.getFirstDataRow(id) ; row != null; row = OPTIONCONTROL.getNextDataRow(row)) {
                //obj = OPTIONCONTROL.getElementData(row); // Data not loaded because mandatory and displayfield or common reported by safdar
                obj = OPTIONCONTROL.getElementData(row, id);
                if (OPTIONCONTROL.compareObject(obj, objData, iCompareValueIndex) == true) {
                    return (row);
                }
            }
        }
        catch (err) {
            err.message = "Exception: {getRowFromObject} " + err.message;
            throw err;
        }

        return (null);
    },

    this.setDataContainerLeftPosition = function (id) {
        var container = null;
        var inputcontainer = null;
        var iLeft = 0;

        try {
            //return; // If parent has relative position below code has problem 10-Sep-2015
            id = FCommon.UI.getValidElement(id);

            container = OPTIONCONTROL.getDataContainerElement(id);
            iLeft = FCommon.UI.getScrollLeft(id, true);


            inputcontainer = document.getElementById(OPTIONCONTROL.getInputContainerId(id));
            if (iLeft > 0 && FCommon.UI.isValidObject(inputcontainer) == true && FCommon.UI.isValidObject(inputcontainer.parentElement) == true) {
                //container.style.left = (FConvert.toInt(inputcontainer.parentElement.offsetLeft) - iLeft) + "px";
                container.style.left = inputcontainer.getBoundingClientRect().left + "px";
            }
            else {
                container.style.left = "";
            }
            container.style.position = "fixed";
            return;


            if (FCommon.UI.isValidObject(container) == true && FCommon.UI.isValidObject(inputcontainer) == true) {
                container.style.position = "fixed";
                container.style.left = inputcontainer.getBoundingClientRect().left + "px";

            }
        }
        catch (err) {
            err.message = "Exception: {setDataContainerLeftPosition} " + err.message;
            throw err;
        }
    },

    this.setDataContainerTopPosition = function (id) {
        var container = null;
        var inputcontainer = null;
        var iTop = 0;

        try {
            id = FCommon.UI.getValidElement(id);

            container = OPTIONCONTROL.getDataContainerElement(id);

            iTop = FCommon.UI.getScrollTop(id);
            inputcontainer = document.getElementById(OPTIONCONTROL.getInputContainerId(id));
            if (iTop > 0 && FCommon.UI.isValidObject(inputcontainer) == true) {
                container.style.top = inputcontainer.getBoundingClientRect().bottom + "px";
            }
            else {
                container.style.top = "";
            }
            container.style.position = "fixed";
            return;
        }
        catch (err) {
            err.message = "Exception: {setDataContainerTopPosition} " + err.message;
            throw err;
        }
    },

    this.setDataContainerPosition = function (id) {
        var container = null;
        var heading = null;
        var inputcontainer = null;
        var inputbox = null;
        var inputimage = null;
        var iWidth = 0;


        try {
            id = FCommon.UI.getValidElement(id);

            container = OPTIONCONTROL.getDataContainerElement(id);
            heading = OPTIONCONTROL.getDataTableHeadingElement(id);
            inputcontainer = document.getElementById(OPTIONCONTROL.getInputContainerId(id));
            inputbox = document.getElementById(id.id);
            inputimage = document.getElementById(OPTIONCONTROL.getInputImageId(id));

            if (FCommon.UI.isValidObject(container) == true && FCommon.UI.isValidObject(heading) == true) {
                iWidth = FCommon.UI.getWidth(heading);
                if (iWidth == 0) {
                    var ele = $(heading).find("colgroup > col");
                    for (var iCounter = 0; iCounter < ele.length; iCounter++) {
                        iWidth += $(ele[iCounter]).width();
                    }
                }

                container.style.width = iWidth + "px";
            }

            OPTIONCONTROL.setDataContainerTopPosition(id);
            OPTIONCONTROL.setDataContainerLeftPosition(id);
        }
        catch (err) {
            err.message = "Exception: {createHeading} " + err.message;
            throw err;
        }
    },

    // {Internal} Call when control down image is clicked
    this.downImageClick = function (id, event) {
        var arrMetaData = null;
        var sValue = "";

        try {
            FCommon.UI.stopKeyProcess(event);
            id = FCommon.UI.getValidElement(id);
            if (id.readOnly == true) {
                return;
            }


            sValue = id.value;
            arrMetaData = OPTIONCONTROL.getMetaData(id);
            if (arrMetaData.length == 0) {
                if (FCommon.String.isNullOrEmpty(sValue, true) == true) {
                    OPTIONCONTROL.processInputs(id, " ", FCommon.UI.getAttributeData(id, "url"), null);
                }

                return;
            }

            if (FCommon.String.isNullOrEmpty(sValue, true) == true && OPTIONCONTROL.getMemoryDataCount(id) == 0) {
                OPTIONCONTROL.processInputs(id, " ", FCommon.UI.getAttributeData(id, "url"), null);
            }

            OPTIONCONTROL.showPopup(id, true);
        }
        catch (err) {
            alert("Exception: {downImageClick} " + err.message);
        }
    },

    // {Internal} Called when table row is clicked
    this.rowClick = function (row, id, event) {
        var sCallback = "";
        var obj = null;
        var element = null;

        try {
            element = OPTIONCONTROL.getSelectedRow(id);
            if (element != null) {
                OPTIONCONTROL.unselectRow(element);
            }

            OPTIONCONTROL.selectRow(row, id);
            OPTIONCONTROL.setSelectedValue(id);

            obj = OPTIONCONTROL.getCallbackDataObject(id, null, false);
            obj.OldValue = FConvert.toInt(FCommon.UI.getAttributeData(id, "lastvalue"));

            obj.Data = OPTIONCONTROL.getControlData(id);
            if (FCommon.UI.isValidObject(obj.Data) == true) {
                obj.Value = FConvert.toInt(COMMON.prototype.getObjectFirstPropertyValue(obj.Data[0]));
            }

            if (obj.OldValue == obj.Value) {
                return;
            }
            FCommon.UI.setAttributeData(id, "lastvalue", obj.Value);

            sCallback = OPTIONCONTROL.getOnDataChangeCallback(id);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                obj.Event = event;
                obj.Flag.bLeave = false;
                obj.Flag.bDataLoad = false;
                obj.Flag.bDataChange = true;
                eval(sCallback)(obj.Control, obj.Data, obj);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.rowClick} " + err.message);
        }
    },

    this.fillDataFromIndex = function (id, arrMetaData, arrIndex) {
        var sDataVariableName = "";
        var iCounter = 0;
        var iCounter1 = 0;
        var iIndex = 0;
        var objArr = null;
        var objData = null;
        var objColumnMetaData = null;
        var row = null;
        var element = null;
        var objBody = null;

        try {
            if (OPTIONCONTROL.isTableDataColGroupExist(id) == false) {
                if (OPTIONCONTROL.createTableDataColGroup(id, arrMetaData) == false) {
                    return (false);
                }
            }

            objBody = OPTIONCONTROL.getDataTableBodyElement(id);
            if (objBody == null) {
                objBody = document.createElement("tbody");
                objBody.id = OPTIONCONTROL.getDataBodyId(id);

                element = OPTIONCONTROL.getDataTableElement(id);
                if (element == null) {
                    return (false);
                }

                element.appendChild(objBody);
            }
            else {
                while (objBody.firstChild) {
                    objBody.removeChild(objBody.firstChild);
                }

            }

            sDataVariableName = OPTIONCONTROL.getDataVariableName(id);
            if (window[sDataVariableName] == null || FCommon.UI.isValidObject(arrIndex) == false || arrIndex.length == 0) {
                return;
            }

            for (iCounter = 0; iCounter < arrIndex.length; iCounter++) {
                iIndex = arrIndex[iCounter];
                if (iIndex >= window[sDataVariableName].length) {
                    continue;
                }

                row = document.createElement("tr");
                row.id = "row_" + iIndex;
                row.className = OPTIONCONTROL.getDataRowClassName();
                row.onmousedown = function (event) {
                    OPTIONCONTROL.rowClick(this, id, event);
                    FCommon.UI.stopKeyProcess(event);
                    OPTIONCONTROL.hidePopup(id);
                };

                objArr = window[sDataVariableName][iIndex];

                for (iCounter1 = 0; iCounter1 < objArr.length; iCounter1++) {
                    if (iCounter1 >= arrMetaData.length) {
                        continue;
                    }

                    objData = objArr[iCounter1];
                    objColumnMetaData = arrMetaData[iCounter1];

                    FCommon.UI.setAttributeData(row, objColumnMetaData.Name, objData.sValue);
                    if (objColumnMetaData.Hidden == false) {
                        element = document.createElement("td");
                        element.className = "option_column";
                        element.style.paddingLeft = "3px";
                        element.style.paddingRight = "3px";
                        element.style.overflow = "hidden";
                        element.style.textOverflow = "ellipsis";
                        element.style.whiteSpace = "pre"; //"nowrap";
                        element.style.display = "table-cell";
                        element.style.verticalAlign = "inherit";
                        element.setAttribute("align", COMMON.prototype.getTableColumnAlignText(objColumnMetaData.Align));
                        COMMON.prototype.setElementText(element, objData.sValue);
                        row.appendChild(element);
                    }
                }

                objBody.appendChild(row);
            }
        }
        catch (err) {
            alert("Exception: {fillDataFromIndex} " + err.message);
        }

    },

    this.getMetaData = function (id) {
        var arrMetaData = [];
        try {
            arrMetaData = window[OPTIONCONTROL.getMetaDataVariableName(id)];
            if (FCommon.UI.isValidObject(arrMetaData) == false) {
                arrMetaData = [];
            }
        }
        catch (err) {
            alert("Exception: {getMetaData} " + err.message);
        }

        return (arrMetaData);
    },

    // Returns memory data array length
    this.getMemoryDataCount = function (id) {
        var sDataVariableName = "";
        var iCount = 0;

        try {
            sDataVariableName = OPTIONCONTROL.getDataVariableName(id);
            if (FCommon.String.isNullOrEmpty(sDataVariableName, true) == true) {
                return (0);
            }

            if (FCommon.UI.isValidObject(window[sDataVariableName]) == true) {
                iCount = window[sDataVariableName].length;
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getMemoryDataCount} " + err.message);
        }

        return (iCount);
    },

    this.isValidStoredData = function (id, key) {
        var sDataVariableName = ""
        var iCompareValueIndex = 0;
        var obj = null;

        try {
            sDataVariableName = OPTIONCONTROL.getDataVariableName(id);
            if (window[sDataVariableName] == null || window[sDataVariableName].length == 0) {
                return (true);
            }

            if (FCommon.String.isNullOrEmpty(key) == true) {
                return (false);
            }

            iCompareValueIndex = OPTIONCONTROL.getCompareValueIndex(id);
            obj = window[sDataVariableName][0];
            if (FCommon.UI.isValidObject(obj) == false || obj.length <= iCompareValueIndex) {
                return (false);
            }

            if (FCommon.String.isNullOrEmpty(obj[iCompareValueIndex].sValue) == true) {
                return (false);
            }

            if (FCommon.String.compare(key, obj[iCompareValueIndex].sValue, true, 1) == 0) {
                return (true);
            }
        }
        catch (err) {
            err.message = "Exception: {isValidStoredData} " + err.message;
            throw err;
        }

        return (false);
    },

    // {Internal} Stores array of data objects in memory
    this.storeDataArrayInMemory = function (id, arrData) {
        var iCounter = 0;
        var objArr = null;

        try {
            if (FCommon.UI.isValidObject(arrData) == null) {
                return;
            }

            for (iCounter = 0; iCounter < arrData.length; iCounter++) {
                objArr = arrData[iCounter];
                OPTIONCONTROL.storeDataInMemory(id, objArr, 0);
            }
        }
        catch (err) {
            err.message = "Exception: {storeDataArrayInMemory} " + err.message;
            throw err;
        }
    },

    // {Internal} Stores data object in memory
    this.storeDataInMemory = function (id, objData, iInsertAfter) {
        var iIndex = 0;
        var iCompareValueIndex = 0;
        var sDataVariableName = "";
        var iResult = 0;
        var iPosition = 0;
        var objExistingData = null;

        try {
            iCompareValueIndex = OPTIONCONTROL.getCompareValueIndex(id);
            sDataVariableName = OPTIONCONTROL.getDataVariableName(id);

            if (FCommon.String.isNullOrEmpty(objData[iCompareValueIndex].sValue) == true || iCompareValueIndex < 0) {
                return (0);
            }

            if (window[sDataVariableName] == null) {
                window[sDataVariableName] = [];
            }

            iPosition = OPTIONCONTROL.getDataPositionInMemory(id, objData, iCompareValueIndex);
            if (iPosition >= 0) { // Data already stored in memory
                return (iPosition);
            }

            for (iIndex = iInsertAfter; iIndex < window[sDataVariableName].length; iIndex++) {
                objExistingData = window[sDataVariableName][iIndex];
                iResult = FCommon.String.compare(objExistingData[iCompareValueIndex].sValue, objData[iCompareValueIndex].sValue, false);
                if (iResult < 0) {
                    continue;
                }

                window[sDataVariableName].splice(iIndex, 0, objData);
                return (iIndex);
            }

            window[sDataVariableName].splice(iIndex, 0, objData);
        }
        catch (err) {
            err.message = "Exception: {storeDataInMemory} " + err.message;
            throw err;
        }

        return (iIndex);
    },

    // {Internal} Returns object position in memory data
    this.getDataPositionInMemory = function (id, objData, iCompareValueIndex) {
        var sDataVariableName = "";
        var iCounter = 0;
        var objExisting = null;

        try {
            sDataVariableName = OPTIONCONTROL.getDataVariableName(id);
            for (iCounter = 0; iCounter < window[sDataVariableName].length; iCounter++) {
                objExisting = window[sDataVariableName][iCounter];
                if (OPTIONCONTROL.compareObject(objExisting, objData, iCompareValueIndex) == true) {
                    return (iCounter);
                }
            }
        }
        catch (err) {
            err.message = "Exception: {getDataPositionInMemory} " + err.message;
            throw err;
        }

        return (-1);
    },

    // {Internal} Returns object from memory data where given value match with store value
    this.getValueFromMemory = function (id, value, iStoreValueIndex) {
        var sDataVariableName = "";
        var iCounter = 0;
        var iTotal = 0;
        var objExisting = null;
        var result = [];

        try {
            if (FCommon.UI.isValidObject(iStoreValueIndex) == false) {
                iStoreValueIndex = OPTIONCONTROL.getStoreValueIndex(id);
            }

            sDataVariableName = OPTIONCONTROL.getDataVariableName(id);
            iTotal = FCommon.Array.getLength(window[sDataVariableName]);
            for (iCounter = 0; iCounter < iTotal; iCounter++) {
                objExisting = window[sDataVariableName][iCounter];
                if (FCommon.String.compare(objExisting[iStoreValueIndex].sValue, value, false) == 0) {
                    result.push(iCounter);
                    result.push(objExisting);
                    return (result);
                }
            }
        }
        catch (err) {
            err.message = "Exception: {getValueFromMemory} " + err.message;
            throw err;
        }

        return (result);
    },

    // {Internal} // Match store key index value in stored data with passed value and select it in control
    this.selectValueInControl = function (id, value, tag, bIgnoreChangeCallback) {
        var sCallback = "";
        var iStoreValueIndex = 0;
        var row = null;
        var result = null;
        var arrIndex = [];
        var obj = null;

        try {
            id = FCommon.UI.getValidElement(id);

            iStoreValueIndex = OPTIONCONTROL.getStoreValueIndex(id);

            obj = OPTIONCONTROL.getCallbackDataObject(id, tag, false);
            obj.OldData = OPTIONCONTROL.getSelectedRowValue(id);

            row = OPTIONCONTROL.getSelectedRow(id);
            OPTIONCONTROL.unselectRow(row);

            result = OPTIONCONTROL.getValueFromMemory(id, value, iStoreValueIndex);
            if (FCommon.UI.isValidObject(result) == true && result.length > 0) {
                row = OPTIONCONTROL.getRowFromObject(id, result[1]);
                if (row == null) {
                    arrIndex.push(result[0]);
                    OPTIONCONTROL.fillDataFromIndex(id, OPTIONCONTROL.getMetaData(id), arrIndex);
                }

                if (row == null) {
                    row = OPTIONCONTROL.getRowFromObject(id, result[1]);
                }

                if (row != null) {
                    OPTIONCONTROL.selectRow(row, id);
                    OPTIONCONTROL.setControlData(id, result[1]);
                }

                obj.Data = OPTIONCONTROL.getSelectedRowValue(id);
                if (FCommon.UI.isValidObject(obj.Data) == true) {
                    obj.Value = FConvert.toInt(COMMON.prototype.getObjectFirstPropertyValue(obj.Data[0]));
                }

                sCallback = OPTIONCONTROL.getOnDataLoadedCallback(id);
                if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                    obj.Flag.bLeave = false;
                    obj.Flag.bDataLoad = true;
                    obj.Flag.bDataChange = false;
                    eval(sCallback)(obj.Control, obj.Data, obj);
                }

                sCallback = OPTIONCONTROL.getOnDataChangeCallback(id);
                if (FCommon.String.isNullOrEmpty(sCallback, true) == false && obj.OldValue != obj.Value) {
                    FCommon.UI.setAttributeData(id, "focusvalue", obj.Value);
                    FCommon.UI.setAttributeData(id, "lastvalue", obj.Value);
                    obj.Flag.bLeave = false;
                    obj.Flag.bDataLoad = false;
                    obj.Flag.bDataChange = true;

                    bIgnoreChangeCallback = FConvert.toBoolean(bIgnoreChangeCallback);
                    if (bIgnoreChangeCallback == false) {
                        eval(sCallback)(obj.Control, obj.Data, obj);
                    }
                }

                return (true);
            }
            else {
                OPTIONCONTROL.setControlData(id, null);
            }
        }
        catch (err) {
            err.message = "Exception: {selectValueInControl} " + err.message;
            throw err;
        }

        return (false);
    },

    // {Internal} Compare objects
    this.compareObject = function (objData, objData1, iCompareValueIndex) {
        var iIndex = 0;
        var iTotal = 0;

        try {
            if (FCommon.UI.isValidObject(objData) == false || FCommon.UI.isValidObject(objData1) == false) {
                return (false);
            }

            if (FCommon.String.compare(objData[iCompareValueIndex].sValue, objData1[iCompareValueIndex].sValue, false) == 0) {
                iTotal = objData.length;
                iTotal = Math.min(objData.length, objData1.length); // Added for length mismatch 30/May/2017
                for (iIndex = 0; iIndex < iTotal; iIndex++) {
                    if (objData[iIndex].sValue != objData1[iIndex].sValue) {
                        break;
                    }
                }

                if (iIndex >= iTotal) {
                    return (true);
                }
            }
        }
        catch (err) {
            err.message = "Exception: {compareObject} " + err.message;
            throw err;
        }

        return (false);
    },

    // {Internal} Returns array of data index of memory data that matched from given key value
    this.getKeyDataIndexArray = function (id, sSearchKey, iStartArrayIndex) {
        var sDataVariableName = "";
        var iCompreValueIndex = 0;
        var sValue = "";
        var arrIndex = [];
        var iCounter = 0;
        var objData = null;
        var bShowAll = false;

        try {
            iCompreValueIndex = OPTIONCONTROL.getCompareValueIndex(id);
            sDataVariableName = OPTIONCONTROL.getDataVariableName(id);

            if (window[sDataVariableName] != null && FCommon.String.isNullOrEmpty(sSearchKey) == false) {
                if (FCommon.String.isNullOrEmpty(sSearchKey.trim()) == true) {
                    bShowAll = true;
                }

                for (iCounter = iStartArrayIndex; iCounter < window[sDataVariableName].length; iCounter++) {
                    objData = window[sDataVariableName][iCounter];
                    if (objData == null || iCompreValueIndex >= objData.length) {
                        continue;
                    }

                    sValue = objData[iCompreValueIndex].sValue;
                    if (sValue.length <= 0 || sSearchKey.length <= 0) {
                        continue;
                    }

                    if (bShowAll == true) {
                        arrIndex.push(iCounter);
                        continue;
                    }
                    else if (sSearchKey.length > sValue.length) {
                        if (FCommon.String.compare(sValue, sSearchKey, true, 0) == 0) {
                            arrIndex.push(iCounter);
                        }
                    }
                    else {
                        if (FCommon.String.compare(sValue, sSearchKey, true, Math.min(sValue.length, sSearchKey.length)) == 0) {
                            arrIndex.push(iCounter);
                        }
                    }
                }
            }
        }
        catch (err) {
            err.message = "Exception: {getKeyDataIndexArray} " + err.message;
            throw err;
        }

        return (arrIndex);
    },

    // {Internal} Cleares memory data array
    this.clearMemoryData = function (id) {
        try {
            window[OPTIONCONTROL.getDataVariableName(id)] = [];
        }
        catch (err) {
            err.message = "Exception: {clearMemoryData} " + err.message;
            throw err;
        }
    },

    // {Internal} Returns existing data row count
    this.getControlDataRowCount = function (id) {
        var objBody = null;
        var element = null;
        var iCount = 0;

        try {
            objBody = OPTIONCONTROL.getDataTableBodyElement(id);
            if (FCommon.UI.isValidObject(objBody) == false) {
                return (0);
            }

            for (element = objBody.firstChild; element != null; element = element.nextSibling) {
                iCount++;
            }
        }
        catch (err) {
            err.message = "Exception: {getControlDataRowCount} " + err.message;
            throw err;
        }

        return (iCount);
    },

    // {Internal} Cleares control data
    this.clearControlData = function (id) {
        var element = null;
        var objBody = null;

        try {
            objBody = OPTIONCONTROL.getDataTableBodyElement(id);
            if (FCommon.UI.isValidObject(objBody) == true) {
                while (objBody.firstChild) {
                    objBody.removeChild(objBody.firstChild);
                }
            }

            element = document.getElementById(id.id + "_data");
            if (FCommon.UI.isValidObject(element) == true) {
                FCommon.UI.removeDataAttribute(element);
                element.value = 0;
            }
        }
        catch (err) {
            err.message = "Exception: {clearControlData} " + err.message;
            throw err;
        }
    },

    // {Internal} Sets selected value into control
    this.setSelectedValue = function (id) {
        var iCompareValueIndex = 0;
        var data = null;

        try {
            id = FCommon.UI.getValidElement(id);
            iCompareValueIndex = OPTIONCONTROL.getCompareValueIndex(id);

            data = OPTIONCONTROL.getElementData(OPTIONCONTROL.getSelectedRow(id), id);
            if (FCommon.UI.isValidObject(data) == true && data.length > iCompareValueIndex) {
                OPTIONCONTROL.setControlData(id, data);
            }
            else {
                OPTIONCONTROL.setControlData(id, null);
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::setSelectedValue} " + err.message;
            throw err;
        }
    },

    // {Internal} Returns selected row value
    this.getSelectedRowValue = function (id) {
        var iCompareValueIndex = 0;
        var data = null;

        try {
            id = FCommon.UI.getValidElement(id);
            iCompareValueIndex = OPTIONCONTROL.getCompareValueIndex(id);

            data = OPTIONCONTROL.getElementData(OPTIONCONTROL.getSelectedRow(id), id);
            if (FCommon.UI.isValidObject(data) == true && data.length > iCompareValueIndex) {
                return (data);
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getSelectedRowValue} " + err.message;
            throw err;
        }

        return (null);
    },

    // {Internal} Returns first data row
    this.getFirstDataRow = function (id) {
        var parent = null;

        try {
            parent = OPTIONCONTROL.getDataTableBodyElement(id);
            if (parent == null) {
                return (null);
            }

            return (parent.firstChild);
        }
        catch (err) {
            alert("Exception: {getFirstDataRow} " + err.message);
        }

        return (null);
    },

    // {Internal} Returns next data row of given
    this.getNextDataRow = function (objRow) {

        try {
            if (FCommon.UI.isValidObject(objRow) == false) {
                return (null);
            }

            objRow = objRow.nextSibling;
        }
        catch (err) {
            err.message = "Exception: {getNextRow} " + err.message;
            throw err;
        }

        return (objRow);
    },

    // {Internal} Returns previous data row of given
    this.getPreviousDataRow = function (objRow) {

        try {
            if (FCommon.UI.isValidObject(objRow) == false) {
                return (null);
            }

            objRow = objRow.previousSibling;
        }
        catch (err) {
            err.message = "Exception: {getPreviousDataRow} " + err.message;
            throw err;
        }

        return (objRow);
    },

    // {Internal} Returns last data row
    this.getLastDataRow = function (id) {
        var parent = null;

        try {
            parent = OPTIONCONTROL.getDataTableBodyElement(id);
            if (parent == null) {
                return (null);
            }

            return (parent.lastChild);
        }
        catch (err) {
            alert("Exception: {getLastDataRow} " + err.message);
        }

        return (null);
    },

    // {Internal} Selects first row
    this.selectFirstRow = function (id) {
        var objRow = null;

        try {
            objRow = OPTIONCONTROL.getSelectedRow(id);
            if (objRow != null) {
                OPTIONCONTROL.unselectRow(objRow);
            }

            objRow = OPTIONCONTROL.getFirstDataRow(id);
            if (objRow != null) {
                objRow.parentElement.parentElement.parentElement.scrollTop = 0;
                OPTIONCONTROL.selectRow(objRow, id);
            }
        }
        catch (err) {
            err.message = "Exception: {selectFirstRow} " + err.message;
            throw err;
        }

        return (objRow);
    },

    // {Internal} Selects last row
    this.selectLastRow = function (id) {
        var objRow = null;

        try {
            objRow = OPTIONCONTROL.getSelectedRow(id);
            if (objRow != null) {
                OPTIONCONTROL.unselectRow(objRow);
            }

            objRow = OPTIONCONTROL.getLastDataRow(id);
            if (objRow != null) {
                OPTIONCONTROL.selectRow(objRow, id);
            }
        }
        catch (err) {
            err.message = "Exception: {selectLastRow} " + err.message;
            throw err;
        }

        return (objRow);
    },

    // {Internal} Returns first selected row
    this.getSelectedRow = function (id) {
        var parent = null;
        var ctrl = null;

        try {
            id = FCommon.UI.getValidElement(id);
            parent = OPTIONCONTROL.getDataTableBodyElement(id);
            if (parent == null) {
                return (null);
            }

            for (ctrl = parent.firstChild; ctrl != null; ctrl = ctrl.nextSibling) {
                if (ctrl.className == OPTIONCONTROL.getSelectedDataRowClassName()) {
                    return (ctrl);
                }
            }
        }
        catch (err) {
            alert("Exception: {getSelectedRow} " + err.message);
        }

        return (null);
    },

    // {Internal} Select next row 
    this.selectNextRow = function (id) {
        var objRow = null;
        var bFlag = false;

        try {
            objRow = OPTIONCONTROL.getSelectedRow(id);
            if (objRow != null) {
                OPTIONCONTROL.unselectRow(objRow);
                objRow = OPTIONCONTROL.getNextDataRow(objRow);
                bFlag = true;
            }

            if (objRow == null) {
                if (bFlag == true) {
                    // Last row disceleted.
                }

                objRow = OPTIONCONTROL.getFirstDataRow(id);
            }

            if (objRow != null) {
                OPTIONCONTROL.selectRow(objRow, id);
            }
        }
        catch (err) {
            err.message = "Exception: {selectNextRow} " + err.message;
            throw err;
        }

        return (objRow);
    },

    // {Internal} Select previous row
    this.selectPreviousRow = function (id) {
        var objRow = null;

        try {
            objRow = OPTIONCONTROL.getSelectedRow(id);
            if (objRow != null) {
                OPTIONCONTROL.unselectRow(objRow);
                objRow = OPTIONCONTROL.getPreviousDataRow(objRow);
            }

            if (objRow == null) {
                objRow = OPTIONCONTROL.getFirstDataRow(id);
            }

            if (objRow != null) {
                OPTIONCONTROL.selectRow(objRow, id);
            }
        }
        catch (err) {
            err.message = "Exception: {selectPreviousRow} " + err.message;
            throw err;
        }

        return (objRow);
    },

    // {Internal} Select given row
    this.selectRow = function (row, id) {
        try {
            if (FCommon.UI.isValidObject(row) == false) {
                return (false);
            }

            row.className = OPTIONCONTROL.getSelectedDataRowClassName();
            if (OPTIONCONTROL.isRowVisible(row, id) == false) {
                OPTIONCONTROL.makeTableRowVisibile(row, id);

                //row.scrollIntoView(false);
            }
        }
        catch (err) {
            err.message = "Exception: {selectRow} " + err.message;
            throw err;
        }

        return (true);
    },

    this.makeTableRowVisibile = function (row, id) {
        var iLastScrollTop = 0;
        var iHeight = 0;

        try {
            iLastScrollTop = row.parentElement.parentElement.parentElement.scrollTop;
            iHeight = row.getBoundingClientRect().height;

            row.parentElement.parentElement.parentElement.scrollTop += iHeight;

            if (OPTIONCONTROL.isRowVisible(row, id) == false) {
                row.parentElement.parentElement.parentElement.scrollTop = iLastScrollTop;
                row.parentElement.parentElement.parentElement.scrollTop -= iHeight;
            }

            if (OPTIONCONTROL.isRowVisible(row, id) == false) {
                row.parentElement.parentElement.parentElement.scrollTop = iLastScrollTop;
            }
        }
        catch (err) {
            err.message = "Exception: {makeTableRowVisibile} " + err.message;
            throw err;
        }
    },

    // {Internal} Checks table row is visible in parent div
    this.isRowVisible = function (row, id) {
        var div = null;
        var rowRect = null;
        var divRect = null;
        var bResult = false;

        try {
            div = document.getElementById(id.id + '_div_data');
            if (FCommon.UI.isValidObject(div) == false) {
                return (false);
            }

            rowRect = row.getBoundingClientRect();
            divRect = div.getBoundingClientRect();

            bResult = rowRect.top >= divRect.top && rowRect.top < (divRect.bottom - 10);

        }
        catch (err) {
            err.message = "Exception: {isRowVisible} " + err.message;
            throw err;
        }

        return (bResult);
    },

    // {Internal} Unselect given row
    this.unselectRow = function (row) {
        try {
            if (FCommon.UI.isValidObject(row) == false) {
                return (false);
            }

            row.className = OPTIONCONTROL.getDataRowClassName();
        }
        catch (err) {
            err.message = "Exception: {unselectRow} " + err.message;
            throw err;
        }

        return (true);
    },

    // {Not Used}
    this.getClickedRowIndex = function (id) {
        var table = null;

        try {
            table = OPTIONCONTROL.getDataTableBodyElement(id);
            if (table == null) {
                return (-1);
            }

            //alert(objRow.rowIndex);
        }
        catch (err) {
            err.message = "Exception: {getClickedRowIndex} " + err.message;
            throw err;
        }
    },

    this.getCallbackDataObject = function (id, tag, bLeave) {
        var obj = {};

        try {
            bLeave = FConvert.toBoolean(bLeave);

            obj.Control = FCommon.UI.getValidElement(id);
            obj.OldData = null;
            obj.Data = null;
            obj.CustomData = FCommon.UI.isValidObject(tag) == true ? tag : null;
            obj.bDataArray = false;
            obj.UserData = OPTIONCONTROL.getUserData(obj.Control);

            // obj.OldValue = FConvert.toInt(FCommon.UI.getAttributeData(obj.Control, "focusvalue"));
            if (FCommon.UI.isSameElement(id, document.activeElement) == true || bLeave == true) {
                obj.OldValue = FConvert.toInt(FCommon.UI.getAttributeData(obj.Control, "focusvalue"));
            }
            else {
                obj.OldValue = FConvert.toInt(OPTIONCONTROL.getControlValue(obj.Control));
            }

            obj.Value = 0;
            obj.Flag = {
                bLeave: false,
                bDataLoad: false,
                bDataChange: false
            };
        }
        catch (err) { }

        return (obj);
    },

    // {Internal} Returns data attribute value array of given element
    this.getElementData = function (element, id) {
        var sMetaDataVariableName = "";
        var data = [];
        var iCounter = 0;

        try {
            if (FCommon.UI.isValidObject(element) == false) {
                return (null);
            }

            if (FCommon.UI.isValidObject(id) == false) {
                for (iCounter = 0; iCounter < element.attributes.length; iCounter++) {
                    if (FCommon.String.compare(element.attributes[iCounter].name, "data-", true, "data-".length) == 0) {
                        data.push({ "sValue": element.attributes[iCounter].value });
                    }
                }
            }
            else {
                id = FCommon.UI.getValidElement(id);
                sMetaDataVariableName = OPTIONCONTROL.getMetaDataVariableName(id);
                for (iCounter = 0; iCounter < window[sMetaDataVariableName].length; iCounter++) {
                    data.push({ "sValue": element.getAttribute("data-" + window[sMetaDataVariableName][iCounter].Name.toLowerCase()) });
                }
            }
        }
        catch (err) {
            err.message = "Exception: {getElementData} " + err.message;
            throw err;
        }

        return (data);
    },

    // {Internal}
    this.getSelectedDataRowClassName = function () {
        return ("option_row_selected");
    },

    // {Internal}
    this.getDataRowClassName = function () {
        return ("option_row");
    },

    // {Internal}
    this.getDataVariableName = function (id) {
        var sName = "";
        try {
            sName = "g_" + id.id + "_data";
        }
        catch (err) {
            err.message = "Exception: {getDataVariableName} " + err.message;
            throw err;
        }

        return (sName);
    },

    // {Internal} // Returns meta data variable name
    this.getMetaDataVariableName = function (id) {
        var sName = "";

        try {
            id = FCommon.UI.getValidElement(id);
            sName = "g_" + id.id + "_metadata";
        }
        catch (err) {
            err.message = "Exception: {getMetaDataVariableName} " + err.message;
            throw err;
        }

        return (sName);
    },

    // {Internal}
    this.getInputContainerId = function (id) {
        var sName = "";

        try {
            sName = id.id + "_input_container";
        }
        catch (err) {
            err.message = "Exception: {getInputContainerId} " + err.message;
            throw err;
        }

        return (sName);
    },

    // {Internal}
    this.getInputImageId = function (id) {
        var sName = "";

        try {
            sName = id.id + "_input_image";
        }
        catch (err) {
            err.message = "Exception: {getInputImageId} " + err.message;
            throw err;
        }

        return (sName);
    },

    // {Internal}
    this.getDataColGroupId = function (id) {
        var sName = "";

        try {
            sName = id.id + "_table_data_colgroup";
        }
        catch (err) {
            err.message = "Exception: {getDataColGroupId} " + err.message;
            throw err;
        }

        return (sName);
    },

    // {Internal}
    this.getDataBodyId = function (id) {
        var sName = "";

        try {
            sName = id.id + "_table_data_body";
        }
        catch (err) {
            err.message = "Exception: {getDataBodyId} " + err.message;
            throw err;
        }

        return (sName);
    },

    // {Internal} 
    this.getCompareValueIndexKey = function () {
        return ("comparevalueindex");
    },

    // {Internal} 
    this.getExactMatchKey = function () {
        return ("exactmatch");
    },

    // {Internal} 
    this.getStoreValueIndexKey = function () {
        return ("storevalueindex");
    },

    // {Internal} Returns data container element which contains data heading and data rows
    this.getDataContainerElement = function (id) {
        var element = null;

        try {
            element = document.getElementById(id.id + "_container");
        }
        catch (err) {
            err.message = "Exception: {getDataContainerElement} " + err.message;
            throw err;
        }

        return (element);
    },

    // {Internal} Returns data table heading element
    this.getDataTableHeadingElement = function (id) {
        var element = null;

        try {
            element = document.getElementById(id.id + "_table_head");
        }
        catch (err) {
            err.message = "Exception: {getDataTableHeadingElement} " + err.message;
            throw err;
        }

        return (element);
    },

    // {Internal} Returns data table element
    this.getDataTableElement = function (id) {
        var element = null;

        try {
            element = document.getElementById(id.id + "_table_data");
        }
        catch (err) {
            err.message = "Exception: {getDataTableElement} " + err.message;
            throw err;
        }

        return (element);
    },

    // {Internal} Returns data table colgroup element
    this.getDataTableColGroupElement = function (id) {
        var element = null;

        try {
            element = document.getElementById(OPTIONCONTROL.getDataColGroupId(id));
        }
        catch (err) {
            err.message = "Exception: {getDataTableColGroupElement} " + err.message;
            throw err;
        }

        return (element);
    },

    // {Internal} Returns body of data table
    this.getDataTableBodyElement = function (id) {
        var element = null;

        try {
            element = document.getElementById(OPTIONCONTROL.getDataBodyId(id));
        }
        catch (err) {
            err.message = "Exception: {getDataTableBodyElement} " + err.message;
            throw err;
        }

        return (element);
    },

    // {Internal} Process up arrow key event
    this.processUpKey = function (id, event) {
        var row = null;

        try {
            FCommon.UI.stopKeyProcess(event);

            if (OPTIONCONTROL.isPopupVisible(id, true) == false && OPTIONCONTROL.getMetaData(id).length > 0) {
                OPTIONCONTROL.showPopup(id, true);
                return;
            }

            row = OPTIONCONTROL.getSelectedRow(id);
            if (row != null) {
                OPTIONCONTROL.unselectRow(row);
                row = OPTIONCONTROL.getPreviousDataRow(row);
            }

            if (row == null) {
                row = OPTIONCONTROL.getFirstDataRow(id);
            }

            if (row != null) {
                OPTIONCONTROL.selectRow(row, id);
            }
        }
        catch (err) {
            err.message = "Exception: {processUpKey} " + err.message;
            throw err;
        }
    }

    // {Internal} Process down arrow key event
    this.processDownKey = function (id, event, sURL) {
        var row = null;
        var bFlag = false;
        var objData = null;
        var obj = null;

        try {
            FCommon.UI.stopKeyProcess(event);

            if (OPTIONCONTROL.isPopupVisible(id, true) == false && OPTIONCONTROL.getMetaData(id).length > 0) {
                OPTIONCONTROL.showPopup(id, true);
                OPTIONCONTROL.setControlValue(id, OPTIONCONTROL.getControlValue(id));
                return;
            }

            row = OPTIONCONTROL.getSelectedRow(id);
            if (FCommon.UI.isValidObject(row) == false) {
                OPTIONCONTROL.selectFirstRow(id);
                return;
            }

            bFlag = true;
            objData = OPTIONCONTROL.getElementData(row);
            OPTIONCONTROL.unselectRow(row);
            row = OPTIONCONTROL.getNextDataRow(row);

            if (row != null) {
                OPTIONCONTROL.selectRow(row, id);
            }
            else if (bFlag == true) {
                obj = OPTIONCONTROL.getServerCommunicationParameterObject(id, sURL);
                obj.sSearch = id.value;
                obj.iExistingDataCount = OPTIONCONTROL.getControlDataRowCount(id);
                obj.SelectedData = objData;
                OPTIONCONTROL.getDataFromServer(obj);
            }
        }
        catch (err) {
            err.message = "Exception: {processDownKey} " + err.message;
            throw err;
        }
    },

    this.onFocus = function (id, bShowError, event) {
        var sCallback = "";
        var value = null;
        var obj = null;

        try {
            if (id == null) {
                if (FConvert.toBoolean(bShowError) == true) {
                    alert("Error: {onFocus} Invalid control id.");
                }

                return (false);
            }

            id = FCommon.UI.getValidElement(id);

            value = document.getElementById(id.id + "_data").value;
            FCommon.UI.setAttributeData(id, "focusvalue", value);
            FCommon.UI.setAttributeData(id, "lastValue", value);
            obj = OPTIONCONTROL.getCallbackDataObject(id, null, false);
            obj.Event = event;

            sCallback = OPTIONCONTROL.getOnFocusCallback(id);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                obj.Flag.bLeave = false;
                obj.Flag.bDataLoad = false;
                obj.Flag.bDataChange = false;
                eval(sCallback)(obj);
            }
        }
        catch (err) {
            if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                alert("Exception: {onFocus} " + err.message);
            }
        }

        return (true);
    },

    this.leaveFocus = function (id, bShowError, event) {
        var sCallback = "";
        var data = null;
        var obj = null;

        try {
            id = FCommon.UI.getValidElement(id);
            obj = OPTIONCONTROL.getCallbackDataObject(id, null, true);
            obj.Event = event;

            OPTIONCONTROL.setSelectedValue(id);
            obj.Data = OPTIONCONTROL.getControlData(id);
            if (FCommon.UI.isValidObject(obj.Data) == true) {
                obj.Value = FConvert.toInt(COMMON.prototype.getObjectFirstPropertyValue(obj.Data[0]));
            }


            OPTIONCONTROL.hidePopup(id, bShowError);

            sCallback = OPTIONCONTROL.getOnDataChangeCallback(id);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false && obj.OldValue != obj.Value) {
                obj.Flag.bLeave = false;
                obj.Flag.bDataLoad = false;
                obj.Flag.bDataChange = true;
                eval(sCallback)(obj.Control, obj.Data, obj);
            }

            sCallback = OPTIONCONTROL.getOnLeaveCallback(id);
            if (FCommon.String.isNullOrEmpty(sCallback, true) == false) {
                obj.Flag.bLeave = true;
                obj.Flag.bDataLoad = false;
                obj.Flag.bDataChange = false;
                eval(sCallback)(id, obj.Data, obj);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL::leaveFocus} " + err.message);
        }
    },

    this.isPopupVisible = function (id, bShowError) {
        var ctrlPopuup = null;

        try {
            if (id == null) {
                if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                    alert("Error: {OPTIONCONTROL::isPopupVisible} Invalid control id.");
                }

                return (false);
            }

            ctrlPopuup = OPTIONCONTROL.getDataContainerElement(id);
            if (ctrlPopuup == null) {
                if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                    alert("Error: {OPTIONCONTROL::isPopupVisible} Data container not found.");
                }

                return (false);
            }

            return (ctrlPopuup.style.display != 'none');
        }
        catch (err) {
            if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                alert("Exception: {OPTIONCONTROL::isPopupVisible} " + err.message);
            }
        }

        return (false);
    },

    this.showPopup = function (id, bShowError) {
        var ctrlPopup = null;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                if (FConvert.toBoolean(bShowError) == true) {
                    alert("Error: {OPTIONCONTROL.showPopup} Invalid control id.");
                }

                return (false);
            }

            if (FCommon.String.isNullOrEmpty(id.id) == true) {
                if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                    alert("Error: {OPTIONCONTROL::showPopup} Control id cannot be blank.");
                }

                return (false);
            }

            ctrlPopup = OPTIONCONTROL.getDataContainerElement(id);
            if (ctrlPopup == null) {
                if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                    alert("Error: {OPTIONCONTROL::showPopup} Data container not found.");
                }

                return (false);
            }

            //OPTIONCONTROL.setDataContainerLeftPosition(id);
            ctrlPopup.style.display = '';

            FCommon.UI.setFocusDropdownPopupPosition(id, ctrlPopup);
            FCommon.UI.selectTextInInput(id, id.value.length, id.value.length);

            return (true);
        }
        catch (err) {
            if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                alert("Exception: {OPTIONCONTROL::showPopup} " + err.message);
            }
        }

        return (false);
    },

    this.hidePopup = function (id, bShowError) {
        var ctrlPopuup = null;
        debugger
        try {
            if (id == null) {
                if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                    alert("Error: {OPTIONCONTROL::hidePopup} Invalid control id.");
                }

                return (false);
            }

            ctrlPopuup = OPTIONCONTROL.getDataContainerElement(id);
            if (ctrlPopuup == null) {
                if (FConvert.toBoolean(bShowError) == true) {
                    alert("Error: {OPTIONCONTROL::hidePopup} Data container not found.");
                }

                return (false);
            }

            ctrlPopuup.style.display = 'none';

            return (true);
        }
        catch (err) {
            if (FCommon.UI.isValidObject(bShowError) == true && bShowError == true) {
                alert("Exception: {OPTIONCONTROL::hidePopup} " + err.message);
            }
        }

        return (false);
    },

    // {Internal} Returns is unmatched data needed to be stored
    this.isKeepUnmatchedData = function (id) {
        var vValue = null;

        try {
            vValue = FCommon.UI.getAttributeData(id, "keepunmatcheddata");
            if (FCommon.UI.isValidObject(vValue) == false) {
                return (false);
            }

            if (vValue.toLowerCase() == "true") {
                return (true);
            }
        }
        catch (err) {
            err.message = "Exception: {isKeepUnmatchedData} " + err.message;
            throw err;
        }

        return (false);
    },

    // {Internal} Fetches multiple value from server at one go
    this.fillValueInMemory = function (id, arrValue, tag, bLoadAll, bIgnoreChangeCallback) {
        var sURL = "";
        var sValueFilter = "";
        var iStoreValueIndex = 0;
        var iCounter = 0;
        var result = null;
        var arr = [];
        var arrLoadedData = [];
        var objParam = null;

        try {
            iStoreValueIndex = OPTIONCONTROL.getStoreValueIndex(id);

            for (iCounter = 0; iCounter < arrValue.length; iCounter++) {
                result = OPTIONCONTROL.getValueFromMemory(id, arrValue[iCounter], iStoreValueIndex);
                if (FCommon.UI.isValidObject(result) == false || result.length == 0) {
                    arr.push(arrValue[iCounter]);
                }
                else if (result.length >= 2) {
                    arrLoadedData.push(result[1]);
                }
            }

            if (arr.length > 0) {
                sURL = FCommon.UI.getAttributeData(id, "url");
                sValueFilter = FCommon.UI.getAttributeData(id, "valuefilterfield");
                if (FCommon.String.isNullOrEmpty(sValueFilter) == true) {
                    if (FCommon.String.isNullOrEmpty(OPTIONCONTROL.getTableName(id)) == true) {
                        sValueFilter = "a.iMasterId IN(";
                    }
                    else {
                        //sValueFilter = OPTIONCONTROL.getPrimaryField(id) + " IN(" + value; 20/June/2016
                        sValueFilter = OPTIONCONTROL.getPrimaryField(id) + " IN(";
                    }
                }
                else {
                    sValueFilter += " IN(";
                }

                for (iCounter = 0; iCounter < arr.length; iCounter++) {
                    if (iCounter > 0) {
                        sValueFilter += ",";
                    }

                    sValueFilter += '\'' + arr[iCounter] + '\'';
                }

                sValueFilter += ")";

                objParam = OPTIONCONTROL.getServerCommunicationParameterObject(id, sURL);
                objParam.sFilter = sValueFilter;
                objParam.bLoadAll = FConvert.toBoolean(bLoadAll);
                objParam.bIgnoreChangeCallback = FConvert.toBoolean(bIgnoreChangeCallback);
                if (FCommon.UI.isValidObject(tag) == true) {
                    objParam.tag = tag;
                }
                OPTIONCONTROL.getDataFromServer(objParam);
            }
        }
        catch (err) {
            err.message = "Exception: {fillValueInMemory} " + err.message;
            throw err;
        }

        return (arrLoadedData);
    },

    // {Internal} Sets control selected data into hidden element
    this.setControlData = function (id, objData) {
        var sMetaDataVariableName = "";
        var iStoreValueIndex = 0;
        var iCompareValueIndex = 0;
        var iExactMatchValue = 0;
        var iTotal = 0;
        var element = null;

        var iIndex = 0;

        try {
            sMetaDataVariableName = OPTIONCONTROL.getMetaDataVariableName(id);
            iStoreValueIndex = OPTIONCONTROL.getStoreValueIndex(id);
            iCompareValueIndex = OPTIONCONTROL.getCompareValueIndex(id);

            element = document.getElementById(id.id + "_data");
            if (FCommon.UI.isValidObject(element) == false) {
                return;
            }

            iTotal = FCommon.Array.getLength(window[sMetaDataVariableName]);
            for (iIndex = 0; iIndex < iTotal; iIndex++) {
                if (FCommon.UI.isValidObject(objData) == true) {
                    if (iIndex < objData.length) {
                        FCommon.UI.setAttributeData(element, window[sMetaDataVariableName][iIndex].Name, objData[iIndex].sValue);
                    }
                }
                else {
                    FCommon.UI.setAttributeData(element, window[sMetaDataVariableName][iIndex].Name, "");
                }
            }

            if (FCommon.UI.isValidObject(objData) == true) {
                element.setAttribute("value", objData[iStoreValueIndex].sValue);
                id.value = objData[iCompareValueIndex].sValue;
            }
            else {
                element.setAttribute("value", "0");

                iExactMatchValue = OPTIONCONTROL.getExactMatchValue(id);
                if (iExactMatchValue != 0) {
                    id.value = "";
                }
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::setControlData} " + err.message;
            throw err;
        }
    },

    // {Public} Returns option control class name
    this.getClassName = function () {
        return ("FOptionControl");
    },


    // {Public} Returns selected control Raw data
    this.getControlData = function (id) {
        var iCounter = 0;
        var iIndex = 0;
        var element = null;
        var jsondata = {};
        var data = [];

        try {
            id = FCommon.UI.getValidElement(id);

            element = document.getElementById(id.id + "_data");
            for (iCounter = 0; iCounter < element.attributes.length; iCounter++) {
                if (FCommon.String.compare(element.attributes[iCounter].name, "data-", true, "data-".length) == 0) {

                    jsondata[element.attributes[iCounter].name.substr("data-".length)] = element.attributes[iCounter].value;
                    data.push(jsondata);
                    jsondata = {};
                    iIndex++;
                }
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getControlData} " + err.message;
            throw err;
        }

        return (data);
    },

    // {Public} Returns selected control data
    this.getControlDataObject = function (id) {
        var sMetaDataVariableName = "";
        var iCounter = 0;
        var element = null;
        var data = {};

        try {
            id = FCommon.UI.getValidElement(id);

            element = document.getElementById(id.id + "_data");

            sMetaDataVariableName = OPTIONCONTROL.getMetaDataVariableName(id);
            for (iCounter = 0; iCounter < window[sMetaDataVariableName].length; iCounter++) {
                data[window[sMetaDataVariableName][iCounter].Name] = element.getAttribute("data-" + window[sMetaDataVariableName][iCounter].Name.toLowerCase());
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getControlDataObject} " + err.message;
            throw err;
        }

        return (data);
    },

    // {Public} Returns selected value
    this.getControlValue = function (id, sField) {
        var element = null;
        var vValue = null;

        try {
            id = FCommon.UI.getValidElement(id);
            element = document.getElementById(id.id + "_data");
            if (FCommon.UI.isValidObject(element) == false) {
                return (vValue);
            }

            if (FCommon.String.isNullOrEmpty(sField, true) == true) {
                vValue = element.getAttribute("value");
            }
            else {
                vValue = element.getAttribute("data-" + sField.toLowerCase());
            }
        }
        catch (err) {
            console.log("Exception: {OPTIONCONTROL::getControlValue} " + err.message);

            err.message = "Exception: {OPTIONCONTROL::getControlValue} " + err.message;
            throw err;
            //vValue = null;
        }

        return (vValue);
    },

    // {Public} Sets control value 
    this.setControlValue = function (id, value, tag, bLoadAll, bIgnoreChangeCallback) {
        var sCallback = "";
        var sURL = "";
        var sValueFilter = "";
        var arrLoadedData = null;
        var obj = null;
        var objParam = null;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return ("Invalid id.");
            }

            bLoadAll = FConvert.toBoolean(bLoadAll);
            bIgnoreChangeCallback = FConvert.toBoolean(bIgnoreChangeCallback);
            if (Array.isArray(value) == true) {
                arrLoadedData = OPTIONCONTROL.fillValueInMemory(id, value, tag, bLoadAll, bIgnoreChangeCallback);
                //if (FCommon.UI.isValidObject(tag) == true) {
                //    arrLoadedData = OPTIONCONTROL.fillValueInMemory(id, value, tag, bLoadAll);
                //}
                //else {
                //    arrLoadedData = OPTIONCONTROL.fillValueInMemory(id, value);
                //}

                if (arrLoadedData.length > 0) {
                    sCallback = OPTIONCONTROL.getOnDataLoadedCallback(id);
                    if (FCommon.String.isNullOrEmpty(sCallback) == false) {
                        obj = OPTIONCONTROL.getCallbackDataObject(id, tag, false);
                        obj.Data = arrLoadedData;
                        obj.bDataArray = true;
                        obj.Flag.bLeave = false;
                        obj.Flag.bDataLoad = true;
                        obj.Flag.bDataChange = false;

                        eval(sCallback)(id, arrLoadedData, obj);
                    }
                }

                return;
            }

            if (OPTIONCONTROL.selectValueInControl(id, value, tag, bIgnoreChangeCallback) == true) {
                return (true);
            }

            sURL = FCommon.UI.getAttributeData(id, "url");
            sValueFilter = FCommon.UI.getAttributeData(id, "valuefilterfield");
            if (FCommon.String.isNullOrEmpty(sValueFilter) == true) {
                if (FCommon.String.isNullOrEmpty(OPTIONCONTROL.getTableName(id)) == true) {
                    sValueFilter = "a.iMasterId=" + value;
                }
                else {
                    sValueFilter = OPTIONCONTROL.getPrimaryField(id) + "=" + value;
                }
            }
            else {
                sValueFilter += "=";
                sValueFilter += '\'' + value + '\'';
            }


            objParam = OPTIONCONTROL.getServerCommunicationParameterObject(id, sURL);
            objParam.SelectedData = value;
            objParam.sFilter = sValueFilter;
            objParam.bLoadAll = bLoadAll;
            objParam.bIgnoreChangeCallback = bIgnoreChangeCallback;

            if (FCommon.UI.isValidObject(tag) == true) {
                objParam.tag = tag;
            }
            OPTIONCONTROL.getDataFromServer(objParam);
        }
        catch (err) {
            console.log("Exception: {OPTIONCONTROL::setControlValue} " + err.message);

            err.message = "Exception: {OPTIONCONTROL::setControlValue} " + err.message;
            throw err;
        }

        return (false);
    },

    // {Public} Returns inputted text in control
    this.getControlText = function (id) {
        var vValue = "";

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                vValue = id.value;
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getControlText} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Sets control text
    this.setControlText = function (id, sValue, bRefresh) {

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == true) {
                id.value = sValue;

                bRefresh = FConvert.toBoolean(bRefresh);
                if (bRefresh == true) {
                    OPTIONCONTROL.processInputs(id,
                                                sValue,
                                                FCommon.UI.getAttributeData(id, "url"),
                                                OPTIONCONTROL.getElementData(OPTIONCONTROL.getSelectedRow(id), id));
                }
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL.setControlText} " + err.message;
            throw err;
        }
    },

    this.updateControlValue = function (id, sText, iValue, obj) {
        var eleData = null;

        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return;
            }

            id.value = sText;

            eleData = document.getElementById(id.id + "_data");
            if (FCommon.UI.isValidObject(eleData) == false) {
                return;
            }

            FCommon.UI.removeDataAttribute(eleData);
            eleData.value = FConvert.toInt(iValue);

            if (FCommon.UI.isValidObject(obj) == true) {
                FCommon.UI.setAttributeData(eleData, obj);
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.updateControlValue} " + err.message);
        }
    },

    // {Public} Cleares memory and control data
    this.clear = function (id, bDoNotClearInput) {
        try {
            id = FCommon.UI.getValidElement(id);

            OPTIONCONTROL.clearMemoryData(id);
            OPTIONCONTROL.clearControlData(id);

            if (FCommon.UI.isValidObject(bDoNotClearInput) == false || bDoNotClearInput == false) {
                id.value = "";
            }
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::clear} " + err.message;
            throw err;
        }
    },

    // {Public} Returns mastertype id
    this.getMasterTypeId = function (id) {
        var value = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            value = FConvert.toInt(FCommon.UI.getAttributeData(id, "mastertypeid"));
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getMasterTypeId} " + err.message;
            throw err;
        }

        return (value);
    },

    this.isMandatory = function (id) {
        var value = 0;

        try {
            id = FCommon.UI.getValidElement(id);
            value = FConvert.toBoolean(FCommon.UI.getAttributeData(id, "bmandatory"));
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL.isMandatory} " + err.message;
            throw err;
        }

        return (value);
    },

    // {Public} Sets Filter
    this.setFilter = function (id, filter, bDoNotClear) {
        id = FCommon.UI.getValidElement(id);

        FCommon.UI.setAttributeData(id, "filter", filter);

        if (FConvert.toBoolean(bDoNotClear) == false) {
            OPTIONCONTROL.clear(id);
        }
    },

    // {Public} Returns filter
    this.getFilter = function (id) {
        var vValue = null;

        try {
            vValue = FCommon.UI.getAttributeData(id, "filter");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getFilter} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Sets mastertype id
    this.setMasterTypeId = function (id, iMasterTypeId) {
        id = FCommon.UI.getValidElement(id);

        FCommon.UI.setAttributeData(id, "mastertypeid", iMasterTypeId);

        OPTIONCONTROL.clear(id);
    },

    // {Public} Returns compare value index received from server while fetching data
    this.getCompareValueIndex = function (id) {
        var vValue = 0;

        try {
            vValue = FCommon.UI.getAttributeData(id, OPTIONCONTROL.getCompareValueIndexKey());
            if (FCommon.UI.isValidObject(vValue) == false) {
                vValue = 0;
            }

            vValue = Number(vValue);
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getCompareValueIndex} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Sets compare value index
    this.setCompareValueIndex = function (id, iCompareValueIndex) {
        FCommon.UI.setAttributeData(id, OPTIONCONTROL.getCompareValueIndexKey(), iCompareValueIndex);
    },

    // {Public} Returns exact match flag value
    this.getExactMatchValue = function (id) {
        var vValue = 0;

        try {
            vValue = FCommon.UI.getAttributeData(id, OPTIONCONTROL.getExactMatchKey());
            if (FCommon.UI.isValidObject(vValue) == false) {
                vValue = 1;
            }

            vValue = parseInt(vValue);
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getExactMatchValue} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Sets Table Name
    this.setTableName = function (id, table) {
        id = FCommon.UI.getValidElement(id);

        FCommon.UI.setAttributeData(id, "tablename", table);

        OPTIONCONTROL.clear(id);
    },

    // {Public} Returns Table Name
    this.getTableName = function (id) {
        var vValue = null;

        try {
            vValue = FCommon.UI.getAttributeData(id, "tablename");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getTableName} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Sets Primary Field
    this.setPrimaryField = function (id, field) {
        id = FCommon.UI.getValidElement(id);

        FCommon.UI.setAttributeData(id, "primaryfield", field);

        OPTIONCONTROL.clear(id);
    },

    // {Public} Returns Primary Field
    this.getPrimaryField = function (id) {
        var vValue = null;

        try {
            vValue = FCommon.UI.getAttributeData(id, "primaryfield");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getPrimaryField} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Sets Display Field
    this.setDisplayField = function (id, field) {
        id = FCommon.UI.getValidElement(id);

        FCommon.UI.setAttributeData(id, "displayfield", field);

        OPTIONCONTROL.clear(id);
    },

    // {Public} Returns Display Field
    this.getDisplayField = function (id) {
        var vValue = null;

        try {
            vValue = FCommon.UI.getAttributeData(id, "displayfield");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getDisplayField} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Returns mandatory Field
    this.getMandatoryFields = function (id) {
        var vValue = null;

        try {
            vValue = FCommon.UI.getAttributeData(id, "mandatoryfield");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL.getMandatoryFields} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Set mandatory fields in option control
    this.setMandatoryFields = function (id, sFields) {
        try {
            sFields = FConvert.toString(sFields);
            FCommon.UI.setAttributeData(id, "mandatoryfield", sFields);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.setMandatoryFields} " + err.message);
        }
    },

    // {Public} Returns true if option control has specific mandatory Field
    this.hasMandatoryField = function (id, sFieldName) {
        var sMandatoryFields = "";
        var iCounter = 0;
        var arrFields = null;

        try {
            sMandatoryFields = OPTIONCONTROL.getMandatoryFields(id);
            if (FCommon.String.isNullOrEmpty(sMandatoryFields, true) == true) {
                return (false);
            }

            if (FCommon.String.isNullOrEmpty(sFieldName, true) == true) {
                return (true);
            }

            arrFields = sMandatoryFields.split(",");
            for (iCounter = 0; iCounter < arrFields.length; iCounter++) {
                if (arrFields[iCounter].trim() == sFieldName.trim()) {
                    return (true);
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.hasMandatoryField} " + err.message);
        }

        return (false);
    },

    // {Public} Sets User Data
    this.setUserData = function (id, value) {
        try {
            FCommon.UI.setAttributeData(id, "userdata", value);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.setUserData} " + err.message);
        }
    },

    // {Public} Returns User Data
    this.getUserData = function (id) {
        var value = null;

        try {
            value = FCommon.UI.getAttributeData(id, "userdata");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL.getUserData} " + err.message;
            throw err;
        }

        return (value);
    },

    // {Public} Returns onfocus callback method name
    this.getOnFocusCallback = function (id) {
        var sValue = "";

        try {
            sValue = FCommon.UI.getAttributeData(id, "onfocus");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL.getOnFocusCallback} " + err.message;
        }

        return (sValue);
    },

    // {Public} Returns onblur callback method name
    this.getOnLeaveCallback = function (id) {
        var sValue = "";

        try {
            sValue = FCommon.UI.getAttributeData(id, "onleave");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getOnLeaveCallback} " + err.message;
        }

        return (sValue);
    },

    // {Public} Returns onKeyDown callback method name
    this.getOnKeyDownCallback = function (id) {
        var sValue = "";

        try {
            sValue = FCommon.UI.getAttributeData(id, "onkeydown");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getOnKeyDownCallback} " + err.message;
        }

        return (sValue);
    },

    // {Public} Returns on data loaded callback method name
    this.getOnDataLoadedCallback = function (id) {
        var sValue = "";

        try {
            id = FCommon.UI.getValidElement(id);
            sValue = FCommon.UI.getAttributeData(id, "ondataloaded");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getOnDataLoadedCallback} " + err.message;
        }

        return (sValue);
    },

    // {Public} Returns on data change callback method name
    this.getOnDataChangeCallback = function (id) {
        var sValue = "";

        try {
            id = FCommon.UI.getValidElement(id);
            sValue = FCommon.UI.getAttributeData(id, "ondatachange");
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getOnDataChangeCallback} " + err.message;
        }

        return (sValue);
    },


    // {Public} Returns store value index received from server while fetching data
    this.getStoreValueIndex = function (id) {
        var vValue = 0;

        try {
            vValue = FCommon.UI.getAttributeData(id, OPTIONCONTROL.getStoreValueIndexKey());
            if (FCommon.UI.isValidObject(vValue) == false) {
                vValue = 0;
            }

            vValue = Number(vValue);
        }
        catch (err) {
            err.message = "Exception: {OPTIONCONTROL::getStoreValueIndex} " + err.message;
            throw err;
        }

        return (vValue);
    },

    // {Public} Sets store value index
    this.setStoreValueIndex = function (id, iStoreValueIndex) {
        FCommon.UI.setAttributeData(id, OPTIONCONTROL.getStoreValueIndexKey(), iStoreValueIndex);
    },

    this.collapseAllPopups = function () {
        var iCounter = 0;
        var arrElements = null;

        try {
            arrElements = document.getElementsByClassName("option_container");
            if (FCommon.UI.isValidObject(arrElements) == true) {
                for (iCounter = 0; iCounter < arrElements.length; iCounter++) {
                    arrElements[iCounter].style.display = "none";
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.collapseAllPopups} " + err.message);
        }
    },

    this.updatePopupPosition = function () {
        var sId = "";
        var iCounter = 0;
        var arrElements = null;
        var eleId = null;
        var obj = null;

        try {
            arrElements = document.getElementsByClassName("option_container");
            if (FCommon.UI.isValidObject(arrElements) == true) {
                for (iCounter = 0; iCounter < arrElements.length; iCounter++) {
                    if (arrElements[iCounter].style.display === "none") {
                        continue;
                    }

                    sId = arrElements[iCounter].id;
                    if (FCommon.String.isNullOrEmpty(sId) == true) {
                        continue;
                    }

                    sId = FCommon.String.left(sId, sId.length - "_container".length);
                    eleId = FCommon.UI.getValidElement(sId);

                    obj = FCommon.UI.getVisibleWidthHeight(eleId);
                    if (obj.iVisibleWidth < 1 || obj.iVisibleHeight < 1) {
                        arrElements[iCounter].style.display = "none";
                    }
                    else {
                        FCommon.UI.setFocusDropdownPopupPosition(eleId, arrElements[iCounter]);
                    }
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.updatePopupPosition} " + err.message);
        }
    },

    this.setUnit = function (id, iUnitId, iItemId) {
        try {
            id = FCommon.UI.getValidElement(id);

            id.setAttribute("data-i_UnitId", iUnitId);
            id.setAttribute("data-i_ItemId", iItemId);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.setUnit} " + err.message);
        }
    },

    this.setGroupId = function (id, iGroupId) {
        try {
            id = FCommon.UI.getValidElement(id);

            id.setAttribute("data-i_GroupId", iGroupId);
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.setGroupId} " + err.message);
        }
    },

    this.getGroupId = function (id) {
        var iValue = 0;

        try {
            id = FCommon.UI.getValidElement(id);

            iValue = FConvert.toInt(id.getAttribute("data-i_GroupId"));
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.getGroupId} " + err.message);
        }

        return (iValue);
    },

    // {Public} Create and returns proper object based on passed data and meta data.
    this.convertRawDataIntoObject = function (id, objData) {
        var sMetaDataVariableName = "";
        var iIndex = 0;
        var obj = null;

        try {
            obj = {};
            sMetaDataVariableName = OPTIONCONTROL.getMetaDataVariableName(id);
            for (iIndex = 0; iIndex < window[sMetaDataVariableName].length && iIndex < objData.length; iIndex++) {
                if (FCommon.UI.isValidObject(objData) == true) {
                    if (FCommon.UI.isValidObject(objData[iIndex].sValue) == true) {
                        obj[window[sMetaDataVariableName][iIndex].Name] = objData[iIndex].sValue;
                    }
                    else {
                        obj[window[sMetaDataVariableName][iIndex].Name] = COMMON.prototype.getObjectFirstPropertyValue(objData[iIndex]);
                    }
                }
                else {
                    obj[window[sMetaDataVariableName][iIndex].Name] = "";
                }
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL::convertRawDataIntoObject} " + err.message);
        }

        return (obj);
    },

    // {Public} Enable Disable Control
    this.disableControl = function (id, bDisable) {
        try {
            id = FCommon.UI.getValidElement(id);
            if (FCommon.UI.isValidObject(id) == false) {
                return;
            }

            if (bDisable == true) {
                id.readOnly = true;
                id.parentElement.parentElement.style.backgroundColor = "#EBEBE4";
                id.style.backgroundColor = "#EBEBE4";
                id.parentNode.style.backgroundColor = "#EBEBE4";
            }
            else {
                id.readOnly = false;
                id.parentElement.parentElement.style.backgroundColor = "";
                id.style.backgroundColor = "";
                id.parentNode.style.backgroundColor = "";
            }
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL.disableControl} " + err.message);
        }
    },

    this.getParent = function (ctrl) {
        var result = null;
        var element = null;

        try {
            result = COMMON.prototype.getEmptyResultObject();
            result.lValue = 0;
            result.sValue = "";

            if (FCommon.UI.isValidObject(ctrl) == false) {
                result.lValue = 0;
                result.sValue = "{OPTIONCONTROL::getParent} Option control id required.";

                return (result);
            }

            ctrl = FCommon.UI.getValidElement(ctrl);
            if (FCommon.UI.isValidObject(ctrl) == false) {
                result.lValue = 0;
                result.sValue = "{OPTIONCONTROL::getParent} Option control id cannot be blank.";

                return (result);
            }

            element = document.getElementById(ctrl.id + "_input_container");
            if (FCommon.UI.isValidObject(element) == false) {
                result.lValue = 0;
                result.sValue = "{OPTIONCONTROL::getParent} Invalid control(corrupted).";

                return (result);
            }

            result.data = element.parentElement;
            if (FCommon.UI.isValidObject(result.data) == false) {
                result.lValue = 0;
                result.sValue = "{OPTIONCONTROL::getParent} Parent not found.";

                return (result);
            }

            result.lValue = 1;
        }
        catch (err) {
            result.lValue = -1;
            result.sValue = "{OPTIONCONTROL::getParent} " + err.message;
            bResult = false;
        }

        return (result);
    },

    this.setParent = function (ctrl, newParent, bFocus) {
        var bResult = false;
        var child = null;

        try {
            ctrl = FCommon.UI.getValidElement(ctrl);
            if (FCommon.UI.isValidObject(ctrl) == false) {
                alert("Error: {OPTIONCONTROL::setParent} Option control id cannot be blank");
                return (false);
            }

            if (FCommon.UI.isValidObject(newParent) == false) {
                alert("Error: {OPTIONCONTROL::setParent} New parent object required");
                return (false);
            }

            newParent = FCommon.UI.getValidElement(newParent)
            if (FCommon.UI.isValidObject(newParent) == false) {
                alert("Error: {OPTIONCONTROL::setParent} New parent id cannot be blank");
                return (false);
            }

            child = document.getElementById(ctrl.id + "_input_container");
            if (FCommon.UI.isValidObject(child) == true) {
                newParent.appendChild(child);
            }

            bFocus = FConvert.toBoolean(bFocus);
            if (ctrl.getBoundingClientRect().left != 0 && bFocus == true) {
                ctrl.focus();
            }

            bResult = true;
        }
        catch (err) {
            alert("Exception: {OPTIONCONTROL::setParent} " + newParent.id + ", " + err.message);
            bResult = false;
        }

        return (bResult);
    };

}();
