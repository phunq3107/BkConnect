const convertAddress = (listAddresses, address) => {
    const province = listAddresses.find(province => province.codename === address.province)
    let district = null
    let ward = null
    if (province) {
        district = province.districts.find(district => district.codename === address.district)
        if (district) {
            ward = district.wards.find(ward => ward.codename === address.ward)
        }
        const arr = [address.detail, ward.name, district.name, province.name]
        let res = ""
        for (const e of arr){
            if (e !== address.detail && (e === null || e === "")){
                return res
            }
            else {
                res += e
                if (arr.indexOf(e) !== arr.length -1 && e !== "" && e !== null){
                    res += ", "
                }
            }
        }
        return res
    }
    return address.detail
}

export default convertAddress