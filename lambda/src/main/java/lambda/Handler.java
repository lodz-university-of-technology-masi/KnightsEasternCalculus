package lambda;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import util.Response;

public abstract class Handler<I> implements RequestHandler<I, Response> {
    private DynamoDBMapper dynamoDBMapper;

    public Handler() {
        this.dynamoDBMapper = new DynamoDBMapper(AmazonDynamoDBClientBuilder.defaultClient());
    }

    public DynamoDBMapper getMapper() {
        return dynamoDBMapper;
    }
}
