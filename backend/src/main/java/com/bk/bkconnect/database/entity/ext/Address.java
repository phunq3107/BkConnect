package com.bk.bkconnect.database.entity.ext;

import javax.persistence.Embeddable;

@Embeddable
public class Address {
    public String province;
    public String district;
    public String ward;
    public String detail;

    public Double longitude;
    public Double latitude;
}
