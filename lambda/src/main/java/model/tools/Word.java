package model.tools;

public class Word {
    private String gen;
    private String pos;
    private String text;
    private String ts;

    public String getGen() {
        return gen;
    }

    public String getPos() {
        return pos;
    }

    public String getText() {
        return text;
    }

    public String getTs() {
        return ts;
    }

    public void setGen(String gen) {
        this.gen = gen;
    }

    public void setPos(String pos) {
        this.pos = pos;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setTs(String ts) {
        this.ts = ts;
    }
}
