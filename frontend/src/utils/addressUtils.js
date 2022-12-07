import listAddress from "../assets/vietnam_province.json"

const convertAddress = (listAddresses, address) => {
    const province = listAddress.find(province => province.codename === address.province)
    let district = null
    let ward = null
    let arr = []
    if (province) {
        arr.push(province.name)
        if (address.district) {
            district = province.districts.find(district => district.codename === address.district)
        }
        if (district) {
            arr.push(district.name)
            if (address.ward) {
                ward = district.wards.find(ward => ward.codename === address.ward)
            }
            if (ward) {
                arr.push(ward.name)
            }
        }
        arr.push(address.detail ? address.detail : "")
        let res = ""
        for (const e of arr.reverse()) {
            if (e === null || e === "") {
                if (address.detail && e !== address.detail) {
                    return res
                }
            } else {
                if (e) {
                    res += e
                } else res += ""
                if (arr.indexOf(e) !== arr.length - 1 && e !== "" && e !== null) {
                    res += ", "
                }
            }
        }
        return res
    }
    return address.detail
}
export const convertProvinceCode = (provinceCode = "") => {
    return convertAddress(null, {province: provinceCode})
}

export default convertAddress