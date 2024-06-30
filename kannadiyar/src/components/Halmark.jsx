import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Supply from '../assets/First.png'
import Trust from '../assets/Second.png'
import Generations from '../assets/Third.png'

function Halmark() {
  return (
    <>
      <div className=" lg:flex lg:flex-row lg:mt-5 font-content lg:justify-center">
        {/* Cards 1 */}
        <Card style={{}} className="sm: mt-3 sm: ml-4 sm: mr-4 sm: bg-red-100 lg:m-auto lg:w-3/12 lg:bg-red-100">
          <div className="flex ">
            <div>
              <Card.Img
                className="p-2  w-96 "
                variant="top"
                src={Supply}
              />
            </div>
            <div className="mt-2">
              <Card.Text className="font-semibold font-content pb-1">
                <b>Supply Large Quantity</b>
              </Card.Text>

              <Card.Text className=" text-black font-content">
                Able to supply in large quantity at a best price globally
              </Card.Text>
            </div>
          </div>
        </Card>

        {/* Cards 1 ends */}
        {/* Cards 1 */}
        <Card style={{}} className="font-content sm: mt-3 sm: ml-4 sm: mr-4 sm: bg-blue-100 lg:m-auto lg:w-3/12 lg:bg-blue-100">
          <div className="flex ">
            <div>
              <Card.Img
                className="p-2 h-36 w-96 "
                variant="top"
                src={Trust}
              />
            </div>
            <div className="mt-2">
              <Card.Text className="font-semibold pb-1 font-content">
                <b>Quality | Trust | Belief</b>
              </Card.Text>

              <Card.Text className=" text-black font-content">
                Quality, good will, trust made us reach wide range of customers,
                who come to us generation by generation.
              </Card.Text>
            </div>
          </div>
        </Card>

        {/* Cards 1 ends */}
        {/* Cards 1 */}
        <Card style={{}} className="font-content sm: mt-3 sm: ml-4 sm: mr-4 sm: bg-lime-100 lg:m-auto lg:w-3/12 lg:bg-lime-100">
          <div className="flex ">
            <div>
              <Card.Img
                className="p-2 h-36 w-96 "
                variant="top"
                src={Generations}
              />
            </div>
            <div className="mt-2">
              <Card.Text className="font-semibold font-content pb-1">
                <b>Kannadiyar for three generations</b>
              </Card.Text>

              <Card.Text className="font-content text-black">
                Our 100 year history has made us familiar throughout South
                India.
              </Card.Text>
            </div>
          </div>
        </Card>

        {/* Cards 1 ends */}
      </div>
    </>
  );
}

export default Halmark;
