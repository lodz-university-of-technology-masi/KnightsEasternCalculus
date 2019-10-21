import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class PostRequest implements RequestHandler<PostRequest.Request, PostRequest.Response> {

    AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();

    @Override
    public Response handleRequest(Request input, Context context) {
        Map<String, AttributeValue> _map = new HashMap<>();
        _map.put("id", new AttributeValue().withN(Long.toString(new Date().getTime())));
        _map.put("message", new AttributeValue().withS(input.message));
        client.putItem("Item", _map);
        return new Response(Long.parseLong(_map.get("id").getN()), _map.get("message").getS());
    }

    public static class Request {
        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        private String message;

        public Request(){}
    }

    public static class Response{
        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        private long id;
        private String message;

        public Response(long id, String message){
            this.id = id;
            this.message = message;
        }
    }

}
