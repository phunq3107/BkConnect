package com.bk.bkconnect.domain.response;

public abstract class GenericRs<T extends GenericRs<T>> {

    public T bind() {
        return (T) this;
    }

}
