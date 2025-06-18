import { Truck, Headphones, BadgeCheck } from "lucide-react";

const About = () => {
  return (
    <div className="py-8">
      <section className="grid grid-cols-1 items-center gap-8 rounded-lg bg-white md:grid-cols-2">
        {/* Left Side: Text */}
        <div className="mx-auto max-w-md flex-1 px-4 text-black lg:px-0">
          <h2 className="font-montserrat mb-4 text-4xl font-bold md:text-7xl">
            Our Story
          </h2>
          <p className="mb-4 text-lg">
            Launced in 2015, Exclusive is South Asia's premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className="text-lg">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        {/* Right Side: Image */}
        <div className="flex flex-1 justify-center">
          <img
            src="/about.png"
            alt="About Exclusive"
            loading="lazy"
            className="w-full object-cover"
          />
        </div>
      </section>
      {/* ours */}
      <section className="container mx-auto px-4 py-40">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {/* Feature 1 */}
          <div>
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full border-8 border-gray-200 bg-black">
              <Truck className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-1 text-lg font-bold">FREE AND FAST DELIVERY</h3>
            <p className="text-sm text-gray-600">
              Free delivery for all orders over $140
            </p>
          </div>
          {/* Feature 2 */}
          <div>
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full border-8 border-gray-200 bg-black">
              <Headphones className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-1 text-lg font-bold">24/7 CUSTOMER SERVICE</h3>
            <p className="text-sm text-gray-600">
              Friendly 24/7 customer support
            </p>
          </div>
          {/* Feature 3 */}
          <div>
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full border-8 border-gray-200 bg-black">
              <BadgeCheck className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-1 text-lg font-bold">MONEY BACK GUARANTEE</h3>
            <p className="text-sm text-gray-600">
              We return money within 30 days
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
