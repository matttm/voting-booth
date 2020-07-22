package com.matttm.votingboothbackend.messages;

/**
 * Created by Matt Maloney on 7/22/2020
 * matttm : mtm9051
 * matttmaloney@gmail.com
 * mtm9051@rit.edu
 * Language:  Java 1.8
 */
public class SimpleMessage<K> {

    private Boolean success;
    private K data;

    public SimpleMessage(Boolean success, K data) {
        this.success = success;
        this.data = data;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public K getData() {
        return data;
    }

    public void setData(K data) {
        this.data = data;
    }
}
