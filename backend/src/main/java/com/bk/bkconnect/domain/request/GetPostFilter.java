package com.bk.bkconnect.domain.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetPostFilter extends GenericRq{
    public boolean getAll = false;
}
