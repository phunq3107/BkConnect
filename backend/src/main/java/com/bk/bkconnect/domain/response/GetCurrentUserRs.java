package com.bk.bkconnect.domain.response;

import lombok.AllArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
public class GetCurrentUserRs extends GenericRs<GetCurrentUserRs> {
    // TODO: 23/11/2022
    public UUID id;
    public String username;
    public String fullname;
    public String role;
    public String avatar;
}
