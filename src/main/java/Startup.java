import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.Context;

import java.util.List;

public class Startup implements RequestHandler<Startup.Request, Startup.Response> {

    AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();

    public Response handleRequest(Request request, Context context) {
        DynamoDBScanExpression queryExpression = new DynamoDBScanExpression();
        DynamoDBMapper mapper = new DynamoDBMapper(client);
        queryExpression.setLimit(10);
        List<Item> list = mapper.scan(Item.class, queryExpression);
        return new Response(list);
    }

    public static class Request {
        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String  firstName, lastName;
    }

    @DynamoDBTable(tableName = "Item")
    public static class Item {
        @DynamoDBAttribute(attributeName = "message")
        public String getMess() {
            return mess;
        }

        public void setMess(String mess) {
            this.mess = mess;
        }

        @DynamoDBHashKey
        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String mess;
        private long id;

    }

    public static class Response {
        public List<Item> list;

        public List<Item> getList() {
            return list;
        }

        public void setList(List<Item> list) {
            this.list = list;
        }

        public Response(List<Item> list){
            this.list = list;
        }
    }
}