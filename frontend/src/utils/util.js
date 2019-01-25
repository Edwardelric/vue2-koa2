import { Toast } from 'vant';
/*
* 获取当前时间
* @param  _symbol  :
* @return String   2019:01:18:10:29
* */
let getCurrentTime = (_symbol = ':') => {
  let date = new Date();
  let y = date.getFullYear();
  let m = ('0' + (date.getMonth() + 1)).slice(-2);
  let d = ('0' + date.getDate()).slice(-2);
  let h = ('0' + date.getHours()).slice(-2);
  let f = ('0' + date.getMinutes()).slice(-2);
  let s = ('0' + date.getSeconds()).slice(-2);
  return y + _symbol + m + _symbol + d + _symbol + h + _symbol + f + _symbol + s;
};

/**
 * 时间格式化
 * @param  date      当前日期或时间戳
 * @param  format    格式化规则
 * @return String    2018/12/05 11:21:10 100s
 */
let formatDate = (date, format) => {
  let _date = date ? new Date(date) : new Date();
  let formatDate = {
    'M+': _date.getMonth() + 1,
    'd+': _date.getDate(),
    'h+': _date.getHours(),
    'm+': _date.getMinutes(),
    's+': _date.getSeconds(),
    'S': _date.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    let $1 = (/(y+)/i.exec(format))[1];
    format = format.replace($1, (_date.getFullYear() + '').substr(4 - $1.length));
    for (let item in formatDate) {
      if (new RegExp('(' + item + ')').test(format)) {
        let $$1 = (new RegExp('(' + item + ')').exec(format))[1];
        format = format.replace($$1, ($$1.length === 1) ? (formatDate[item]) : (('00' + formatDate[item]).substr(('' + formatDate[item]).length)));
      }
    }
  }
  return format;
};

/**
 * 金额格式化
 * @param  val            具体金额数
 * @param  _decimals      保留小数位
 * @param  _flag          是否千分位格式化
 * @param  _symbol        金额单位前缀
 * @return String         ￥1,000.00
 */
let currency = (val, _decimals = 2, _flag = true, _symbol = '￥') => {
  val = parseFloat(val);
  if (!isFinite(val) || !val && val !== 0) {
    return '';
  }
  let stringified = Math.abs(val).toFixed(_decimals),
    sign = val < 0 ? '-' : '';
  if (!_flag) {
    return sign + _symbol + stringified;
  } else {
    let digitsRE = /(\d{3})(?=\d)/g,
      int = _decimals ? stringified.slice(0, -1 - _decimals) : stringified,
      i = int.length % 3,
      head = i > 0 ? int.slice(0, i) + (int.length > 3 ? ',' : '') : '',
      _float = _decimals ? stringified.slice(-1 - _decimals) : '';
    
    return sign + _symbol + head + int.slice(i).replace(digitsRE, '$1,') + _float;
  }
};

/*
* 手机号验证
* @param  String  手机号
* @return Boolean
* */
let validatePhone = (pNum) => {
  let phone = (pNum + '').trim();
  let reg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (pNum.length !== 11) {
    consoleError('phone number must be 11 digits');
    return false;
  } else if (!reg.test(pNum)) {
    consoleError('phone number invalid');
    return false;
  } else {
    return true;
  }
};

/*
* 车牌验证
* @param  String plate 车牌号
* @return Boolean
* */
let validatePlate = (plate) => {
  let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(?![A-Z]+\b)[A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  plate = (plate + '').trim();
  if (!plate || /^\s*$/.test(plate)) {
    consoleError('licence plate can not be empty');
    return false;
  } else if (!reg.test(palte)) {
    consoleError('license plate is illegal');
    return false;
  } else {
    return true;
  }
};

let consoleError = (txt) => {
  if (typeof console !== 'undefined') {
    console.error(txt)
  }
};

let consoleLog = (txt) => {
  if (typeof console !== 'undefined') {
    console.log(txt);
  }
};

let timer = null;
let isLoading = (flag, opts) => {
  if (flag) {
    Toast.loading({
      duration: opts.duration || 0,
      forbidClick: opts.forbidClick || true, // 禁用背景点击
      loadingType: opts.loadingType || 'spinner',
      message: opts.message || ''
    });
  } else {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      Toast.clear();
    }, opts.duration || 600);
  }
}

export {
  getCurrentTime,
  formatDate,
  currency,
  validatePhone,
  validatePlate,
  consoleError,
  consoleLog,
  isLoading
}
