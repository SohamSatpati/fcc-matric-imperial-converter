function splitNumberString(inputStr) {
  let numberRegex = inputStr.match(/[(0-9)+\.(0-9)+\/(0-9)]+/g) || ['1']
  let stringRegex = inputStr.match(/[a-zA-Z]+/g)
  //console.log('splitNumberString', numberRegex, stringRegex);
  if (stringRegex === null || stringRegex === undefined) {
    return [numberRegex[0], false]
  } else {
    return [numberRegex[0], stringRegex]
  }
}
function checkDiv(possibleFraction) {
  let nums = possibleFraction.split('/')
  if (nums.length > 2) {
    return false
  }
  return nums
}
function ConvertHandler() {
  this.getNum = function (input) {
    console.log('getnum:', input)
    let result = splitNumberString(input)[0]
    let nums = checkDiv(result)
    if (!nums) {
      return undefined
    }
    let num1 = nums[0]
    let num2 = nums[1] || '1'
    if (isNaN(num1) || isNaN(num2)) {
      return undefined
    }
    result = Number(num1) / Number(num2)
    // console.log('result=', result);
    return result
  }

  this.getUnit = function (input) {
    console.log('getunit:', input)
    // const validUnitsRegex =
    //   /^(gal)|(L)|(kg)|(lbs)|(mi)|(km)|(KM)|(GAL)|(KG)|(MI)|(LBS)$/;
    let result = splitNumberString(input)[1]
    // console.log('unit is:', result[0].toLowerCase());
    result = result[0].toLowerCase()
    // if (result[0] === undefined) {
    //   return false;
    // }
    // else {
    // if (result[0].match(validUnitsRegex)) {
    //   console.log('matched!');
    //   return result[0];
    // } else {
    //   console.log('not matched!');
    //   return false;
    // }
    switch (result) {
      case 'km':
        return 'km'
      case 'mi':
        return 'mi'
      case 'kg':
        return 'kg'
      case 'lbs':
        return 'lbs'
      case 'l':
        return 'L'
      case 'gal':
        return 'gal'
      default:
        return undefined
    }
    // }
    //return result;
  }

  this.getReturnUnit = function (initUnit) {
    let result
    switch (initUnit) {
      case 'km':
        result = 'mi'
        break
      case 'mi':
        result = 'km'
        break
      case 'L':
        result = 'gal'
        break
      case 'gal':
        result = 'L'
        break
      case 'kg':
        result = 'lbs'
        break
      case 'lbs':
        result = 'kg'
        break
      default:
        result = undefined
        break
    }
    return result
  }

  this.spellOutUnit = function (unit) {
    let result
    switch (unit) {
      case 'km':
        result = 'kilometers'
        break
      case 'mi':
        result = 'miles'
        break
      case 'L':
        result = 'liters'
        break
      case 'gal':
        result = 'gallons'
        break
      case 'kg':
        result = 'kilograms'
        break
      case 'lbs':
        result = 'pounds'
        break
      default:
        result = undefined
        break
    }
    return result
  }

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541
    const lbsToKg = 0.453592
    const miToKm = 1.60934
    const LTogal = 1 / galToL
    const KgTolbs = 1 / lbsToKg
    const KmTomi = 1 / miToKm
    let unit = initUnit.toLowerCase()

    let result
    switch (unit) {
      case 'km':
        result = initNum * KmTomi
        break
      case 'mi':
        result = initNum * miToKm
        break
      case 'l':
        result = initNum * LTogal
        break
      case 'gal':
        result = initNum * galToL
        break
      case 'kg':
        result = initNum * KgTolbs
        break
      case 'lbs':
        result = initNum * lbsToKg
        break
      default:
        result = undefined
    }

    return Number(result.toFixed(5))
  }

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let initUnitString = this.spellOutUnit(initUnit)
    let returnUnitString = this.spellOutUnit(returnUnit)
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`
  }
}

module.exports = ConvertHandler
