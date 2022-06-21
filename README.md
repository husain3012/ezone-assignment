# Next.js With Prisma

## Getting started

### 1. Download example and install dependencies

Download this example:


Clone this repository:

```shell
git clone git@github.com:husain3012/ezone-assignment.git
```

Install npm dependencies:

```shell
cd ezone-assignment
yarn
```

### 2. Create the database

Add DATABASE_URL for your posgress database

```shell
yarn prisma:migrate
```

### 3. Start the app

```shell
yarn dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

## REST API to fetch data from database:

```typescript
const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pageSize, pageIndex } = req.query || {
    pageIndex: 0,
    pageSize: 20,
  };
  const skipNum = parseInt(pageIndex as string) * parseInt(pageSize as string);
  const takeNum = parseInt(pageSize as string);
  const hotels = (
    await prisma.hotel.findMany({
      skip: skipNum,
      take: takeNum,
    })
  ).map((hotel) => {
    return {
      id: hotel.id,
      name: hotel.property_name,
      area: hotel.area,
      city: hotel.city,
      country: hotel.country,
      tripadvisorRating: hotel.mmt_tripadvisor_count,
      url: hotel.pageurl,
    };
  });
    return res.json(hotels);
};
```
