import Col from "react-bootstrap/Col";
import Card from "./Card";

const GenerateColumn = ({ contentType, data, displayCount }) => {
    const elements = [];

    if (displayCount) {
        for (let i = 0; i < displayCount; i++) {
            elements.push(
                <Col key={i}>
                    {data[i] ? (
                        <Card contentType={contentType} item={data[i]} />
                    ) : null}
                </Col>
            );
        }
        return elements;
    }

    for (let i = 0; i < data.length; i++) {
        elements.push(
            <Col sm={6} md={4} lg={3} xl={2} key={i}>
                <Card contentType={contentType} item={data[i]} />
            </Col>
        );
    }

    return elements;
};

export default GenerateColumn;
