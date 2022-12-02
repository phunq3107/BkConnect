package com.bk.bkconnect.domain.response;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

public class PageableRs<T extends GenericRs<T>> {
    public int total;
    public int pageNumber;
    public int pageSize;
    public List<T> data;


    public static <R, T extends GenericRs<T>> PageableRs<T> build(List<R> data, int pageNumber, int pageSize, Function<? super R, ? extends T> mapper) {
        var total = data.size();
        var arr = new ArrayList<T>();
        for (int i = (pageNumber - 1) * pageSize; i < pageNumber * pageSize; i++) {
            if (i >= 0 && i < total) {
                arr.add(mapper.apply(data.get(i)));
            }
        }
        var rs = new PageableRs<T>();
        rs.total = total;
        rs.pageNumber = pageNumber;
        rs.pageSize = pageSize;
        rs.data = arr;
        return rs;
    }

}
