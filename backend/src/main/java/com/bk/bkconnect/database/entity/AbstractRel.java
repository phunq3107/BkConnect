package com.bk.bkconnect.database.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@MappedSuperclass
public abstract class AbstractRel<LeftEnt extends AbstractEnt, RightEnt extends AbstractEnt> implements Serializable {

    @Embeddable
    public static class RelId implements Serializable {
        @Column(name = "LEFT_ID")
        @Type(type = "uuid-char")
        public UUID leftId;
        @Column(name = "RIGHT_ID")
        @Type(type = "uuid-char")
        public UUID rightId;

        public RelId() {
        }

        public RelId(UUID leftId, UUID rightId) {
            this.leftId = leftId;
            this.rightId = rightId;
        }

        public boolean equals(Object o) {
            if (!(o instanceof RelId that)) return false;
            return this.leftId.equals(that.leftId)
                    && this.rightId.equals(that.rightId);


        }

        public int hashCode() {
            return leftId.hashCode() + rightId.hashCode();
        }
    }

    @EmbeddedId
    public RelId id = new RelId();

    public String state;
    public Boolean disable;

    @ManyToOne
    @JoinColumn(
            name = "LEFT_ID",
            insertable = false, updatable = false
    )
    public LeftEnt left;

    @ManyToOne
    @JoinColumn(
            name = "RIGHT_ID",
            insertable = false, updatable = false
    )
    public RightEnt right;
}
