export const limitString = (str = "", rep = "", limit = 100, ext = "...") => {
    const res = str || rep
    if (res.length <= limit) return res
    else return res.slice(0, limit) + ext
}