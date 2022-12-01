package com.bk.bkconnect.database.entity.ext;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.Embeddable;
import java.util.UUID;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class TutorSubject {
    @Type(type = "uuid-char")
    public UUID subjectId;
    public String name;
    public String level;
    public Long expectedFee; // -1, int
    public String certificates;

}
