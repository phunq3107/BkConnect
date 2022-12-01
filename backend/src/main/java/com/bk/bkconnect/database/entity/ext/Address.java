package com.bk.bkconnect.database.entity.ext;

import javax.persistence.Embeddable;

@Embeddable
public class Address {
    public String province; //code_name
    public String district;//code_name
    public String ward;//code_name
    public String detail; // userPlace, tutorPlace

    public Double longitude;
    public Double latitude;
}
