let checkVal = {
  isEmpty(value) {
    // 빈 값 체크
    if (value === undefined) {
      return true
    }
    if (typeof value === 'number') {
      if (value === 0) {
        return true
      }
    } else if (typeof value === 'string') {
      if (value === '' || value.length === 0) {
        return true
      }
    } else if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return true
        }
      } else if (!value) {
        return true
      } else {
        if (Object.keys(value).length === 0) {
          return true
        }
      }
    }
    return false
  },
    // 한글 체크
  isKor(value) {
    let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (checkKor.test(value)) {
      return true
    }  
    return false 
  },
  // 특수문자 체크
  characters(value) {
    const regCh = /[~!@#$%<>^&*()]/g;
    if (regCh.test(value)) {
      return true
    }  
    return false 
  },
  isUserId(userId) {
    // 아이디 유효성 검증
    // 5-15자의 영문 대소문자 숫자로만 입력 가능
    const regId = /^[a-zA-Z0-9]{5,20}$/
    const regEn = /[a-zA-Z]/g
    if (regEn.test(userId) && regId.test(userId)) {
      return true
    }

    return false
  },
  isUserName(userName) {
    // 이름 유효성 검증
    // 국문, 영문 대소문자, 공란 입력 가능
    let regName = /^[가-힣|a-z|A-Z| |*]+$/
    if (regName.test(userName)) {
      return true
    } else {
      return false
    }
  },
  isPassWord(value) {
    // 비밀번호 유효성 검증
    // 영문, 숫자 조합 10자리 이상, 영문, 숫자, 특수문자 조합 8자리 이상
    const regEn = /[a-z]/gi
    const regNum = /[0-9]/g
    const regCh = /[~!@#$%<>^&*()]/g

    let valid = [regEn.test(value), regNum.test(value), regCh.test(value)]
    let validcount = valid.filter(v => v === true).length

    // 영문, 숫자 조합 10자리 이상
    if (validcount === 2 && value.length >= 6) {
      return true
    }

    if (validcount === 3 && value.length >= 4) {
      return true
    }
    return false
  },  

  isEmail(email) {
    // 이메일 유효성 검증
    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (regEmail.test(email)) {
      return true
    }

    return false
  },
  isPhoneNumber(phoneNumber) {
    // 휴대폰 번호 유효성 검증
    const regPhoneNumber = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/

    if (regPhoneNumber.test(phoneNumber)) {
      return true
    }

    return false
  },
  isUrl(urlAdd) {
    // url 유효성 검증
    // const regUrl = /^(https?):\/\/([0-9a-zA-Z|-]+\.)+[a-zA-Z]{2,6}(|:[0-9]+)?(\/\S*)?/
    // if (regUrl.test(urlAdd)) {
    //   return true
    // }
    // return false
    const pattern = new RegExp(
      // eslint-disable-next-line no-useless-escape
      '^(https?:\/\/)' + // protocol
      '(' +
        '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}' + // domain name
        '|' + // or
        '(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])' + // ipv4 address
      ')' +
      // eslint-disable-next-line no-useless-escape
      '(\:([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))' + // port
      '?(\\/[-a-z\\d%_.~+]*)*' + // path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '$', 'i')
    return !!pattern.test(urlAdd)
  },
  isIpAddress(ipAddr) {
    console.info(' jglib - isIpAddress ')
    const regIpAddr = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/
    if (regIpAddr.test(ipAddr)) {
      return true
    }
    return false
  },
  checkBizRegNum(bizRegNum) {
    // 사업자 등록번호 유효성 검증
    const checkID = [1, 3, 7, 1, 3, 7, 1, 3, 5, 1]
    let chkSum = 0
    let c2
    let remander
    bizRegNum = bizRegNum.replace(/-/gi, '')

    for (let i = 0; i <= 7; i++) chkSum += checkID[i] * bizRegNum.charAt(i)
    c2 = '0' + checkID[8] * bizRegNum.charAt(8)
    c2 = c2.substring(c2.length - 2, c2.length)
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1))
    remander = (10 - (chkSum % 10)) % 10

    if (Math.floor(bizRegNum.charAt(9)) === remander) return true
    return false
  },
  checkFileData(file, availableExts, maxSize) {
    // 파일 확장자, 사이즈 유효성 검증
    // file - element ui 이용 시 file.raw, availableExt - ['jpg', 'png', 'gif'], maxSize - MB 단위로 숫자만
    // 사이즈만 확인 시 checkFileData(file, [], size)
    // 확장자만 확인 시 checkFileData(file, ['jpg', 'png', 'gif'])

    // 파일 사이즈 검증
    if (maxSize === -1) {
      // 제한 없음
    } else if (maxSize && maxSize > 0) {
      let maxSizeByte = maxSize * 1024 * 1024 // MB -> byte로 변환하여 비교
      if (file.size > maxSizeByte) {
        return {
          code: 'errorSize',
          message: maxSize + 'MB 이하의 파일만 업로드 할 수 있습니다.'
        }
      }
    } else {
      return {
        code: 'errorSize',
        message: '파일 사이즈 제한 오류'
      }
    }

    // 파일 확장자 검증
    if (availableExts.length > 0) {
      let exts = availableExts.join('|').toLocaleLowerCase()
      if (!new RegExp('(' + exts.replace(/\./g, '\\.') + ')$').test(file.name.toLocaleLowerCase())) {
        return {
          code: 'errorExt',
          message: availableExts.join(', ') + ' 형식의 파일만 업로드 할 수 있습니다.'
        }
      }
    }

    return {
      code: 'ok',
      message: 'OK'
    }
  },
  checkImageSize(file, minW, minH, maxW, maxH) {
    return new Promise((resolve, reject) => {
      const _URL = window.URL || window.webkitURL
      let img = new Image()
      img.onload = () => {
        const w = img.width
        const h = img.height
        if (w < minW || h < minH || w > maxW || h > maxH) {
          resolve('size')
        } else if (w !== h) {
          resolve('ratio')
        } else {
          resolve('valid')
        }
      }
      img.onabort = () => {
        resolve('abort')
      }
      img.onerror = () => {
        resolve('error')
      }
      img.src = _URL.createObjectURL(file)
    })
  },
  convertFileSizeByte(value) {
    // 파일 사이즈를 byte -> MB 변환
    let kb = 1 * 1024
    let mb = 1 * 1024 * 1024
    let result = value
    if (value > mb) {
      result = Intl.NumberFormat().format(parseInt(value / mb)) + 'MB'
    } else if (value > kb) {
      result = Intl.NumberFormat().format(parseInt(value / kb)) + 'KB'
    }
    return result
  },
  keydownOnlyNum(e) {
    let key = e.which ? e.which : event.keyCode
    let actionKeyList = [8, 9, 37, 38, 39, 40, 46]
    if (
      (key < 48 || key > 57) &&
      (key < 96 || key > 106) &&
      actionKeyList.indexOf(key) === -1 &&
      !e.ctrlKey
    ) {
      event.returnValue = false
      e.preventDefault()
    }
    return true
  },
  keyupOnlyNum(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
  },
  keydownOnlyText(e) {
    let key = e.which ? e.which : event.keyCode
    if (key >= 65 && key <= 90 && (key >= 97 && key <= 122)) {
      event.returnValue = false
      e.preventDefault()
    }
    return true
  },
  keyupOnlyText(e) {
    e.target.value = e.target.value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z]/g, '')
  },
  keydownOnlyText2(e) {
    let key = e.which ? e.which : event.keyCode
    if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
      event.returnValue = false
      e.preventDefault()
    }
    return true
  },
  keyupOnlyEng(e) {
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '')
  },
  /* 공백 미허용 */
  notAllowWhitespace(e) {
    if (e.keyCode === 32) e.preventDefault()
  },
  onlyText(e) {
    let onlyText = /^[가-힣|a-z|A-Z|*]+$/
    if (onlyText.test(e)) {
      return false
    }
    return true
  },
  makeObject(str) {
    if (!str) str = ''
    let units = str.split(';')
    let resObj = {}
    units.forEach(unit => {
      let t = unit.split('=')
      if (t.length !== 2) return
      resObj[t[0]] = t[1]
    })
    return resObj
  },
  makeString(obj) {
    if (!obj) obj = {}
    let keys = Object.keys(obj)
    let keyNValues = keys.map(key => {
      return `${key}=${obj[key] ? obj[key] : ''}`
    })
    return keyNValues.join(';')
  },
  makeKeyNValueArray(str) {
    if (!str) str = ''
    let units = str.split(';')
    let resObj = []
    units.forEach(unit => {
      let t = unit.split('=')
      if (t.length !== 2) return
      resObj.push({
        key: t[0],
        value: t[1]
      })
    })
    return resObj
  },
  makeKeyNValueString(arr) {
    if (!arr || !Array.isArray(arr)) arr = []
    let keyNValues = arr.map(kv => {
      return `${kv.key}=${kv.value}`
    })
    return keyNValues.join(';')
  },
  getPopupPositionLeft(popupWidth) {
    return (document.body.clientWidth - popupWidth) / 2
  },
  /**
   * Fullscreen 버튼 선택 시, content 영역을 확장한다.
   */
  openFullscreen(target) {
    if (target.requestFullscreen) {
      target.requestFullscreen()
    } else if (target.mozRequestFullScreen) {
      /* Firefox */
      target.mozRequestFullScreen()
    } else if (target.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      target.webkitRequestFullscreen()
    } else if (target.msRequestFullscreen) {
      /* IE/Edge */
      target.msRequestFullscreen()
    }
  },
  /**
   * 화면 사이즈를 조정하는 강제 이벤트 발생
   */
  callResizeEvent() {
    let event
    if (typeof Event === 'function') {
      event = new Event('resize')
    } else {
      event = document.createEvent('Event')
      event.initEvent('resize', true, true)
    }
    window.dispatchEvent(event)
  },

  // 사업자등록번호 '-' 추가 함수
  corpRegiNumConverter(corpRegiNum) {
    if (!corpRegiNum) {
      return '-'
    }
    corpRegiNum = corpRegiNum.replace(/-/g, '')
    let convertercorpRegiNum = ''
    let len = [0, 3, 5]
    let len2 = [3, 5, 10]
    for (let i = 0; i < len.length; i++) {
      if (i < 2) {
        convertercorpRegiNum += corpRegiNum.substring(len[i], len2[i]) + '-'
      } else {
        convertercorpRegiNum += corpRegiNum.substring(len[i], len2[i])
      }
    }
    return convertercorpRegiNum
  },

  // 핸드폰번호 '-' 추가 함수
  mobileNumConverter(mobileNum) {
    // mobileNum = mobileNum.replace(/\-/g, '')
    // let converterMobileNum = ''
    // let len = [0, 3, 7]
    // let len2 = [3, 7, 11]
    // for (let i = 0; i < len.length; i++) {
    //   if (i < 2) {
    //     converterMobileNum += mobileNum.substring(len[i], len2[i]) + '-'
    //   } else {
    //     converterMobileNum += mobileNum.substring(len[i], len2[i])
    //   }
    // }
    let converterMobileNum = mobileNum.replace(
      /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
      '$1-$2-$3'
    )
    return converterMobileNum
  },
  telNumConverter(telNum) {
    let result = []
    let restNumber = ''
    // 지역번호와 나머지 번호로 나누기
    if (telNum.startsWith('02')) { // 02 지역번호
      result.push(telNum.substr(0, 2))
      restNumber = telNum.substring(2)
    } else if (telNum.startsWith('1')) { // 1xxx-yyyy
      restNumber = telNum
    } else {
      result.push(telNum.substr(0, 3))
      restNumber = telNum.substring(3)
    }
    if (restNumber.length === 7) { // 7자리만 남았을 때는 xxx-yyyy
      result.push(restNumber.substring(0, 3))
      result.push(restNumber.substring(3))
    } else {
      result.push(restNumber.substring(0, 4))
      result.push(restNumber.substring(4))
    }
    return result.filter((val) => val).join('-')
  },
  // 2자리수로 만들어줌 09,08...
  pad(n, width) {
    n = n + ''
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
  },
  convertDateFormat(dateString, format) {
    if (typeof dateString !== 'string') {
      return ''
    }

    if (dateString.length === 0) {
      return ''
    }
    let date = window.dayjs(dateString)
    return date.format(format)
  },
  convertCamelcaseToSnakecase(string) {
    return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1_$2').toUpperCase()
  },
  convertNumberWithComma(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  /* 입력가능: 국문,영문,공백 / 치환 대상: 특수문자 => '', 연속 공백 => 1개 변환 */
  convertOnlyTextAndOneWhitespace(string) {
    return string.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣| |a-zA-Z]/g, '').replace(/\|/g, '').replace(/ +/g, ' ')
  },
  uniqBy(array, key) {
    let uniq = []
    array.forEach(item => {
      let filtered = uniq.filter(i => i[key] === item[key])
      if (filtered.length === 0) {
        uniq.push(item)
      }
    })
    return uniq
  },
  unescapeHtml(str) {
    if (str == null) {
      return ''
    }
    return str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#39;/g, "'")
  },
  toUppsercaseAfterWhtespace(str) {
    return str === 'SNS' ? 'SNS' : str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }
}

export default checkVal
