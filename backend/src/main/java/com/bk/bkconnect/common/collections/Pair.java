package com.bk.bkconnect.common.collections;

public class Pair<T1, T2> {
    public final T1 _1;
    public final T2 _2;

    public Pair(T1 _1, T2 _2) {
        this._1 = _1;
        this._2 = _2;
    }

    public static <T1,T2> Pair<T1, T2> apply(T1 t1, T2 t2){
        return new Pair<>(t1, t2);
    }
}
