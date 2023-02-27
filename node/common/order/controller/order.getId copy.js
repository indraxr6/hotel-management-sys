try {
     // Get the order ID for the given order number
     const orderId = await order.findOne({
       attributes: ['id'],
       where: { order_number: id }
     }).then(order => order.id);
   
     // Get the order details for the given order ID
     const orderDetailsData = await order_details.findAll({
       where: { id_order: orderId },
       include: {
         model: room,
         as: 'rooms',
         required: true
       }
     });
   
   


     // if (!orderData) {
     //      return res.status(404).json({
     //           message: "Order data not found.",
     //           status_code: 404,
     //      });
     // }

     // if (orderData.order_status == 'CANCEL') {
     //      return res.status(404).json({
     //           message: "This transaction is canceled."
     //      })
     // }

     const orderSummary = {
          id: orderId,
          price: orderDetailsData.reduce((totalPrice, orderDetail) => totalPrice + orderDetail.price, 0),
          room_numbers: [...new Set(orderDetailsData.map(orderDetail => orderDetail.rooms.room_number))]
        };

     res.status(200).json({
          status_code: 200,
          message: `Fetched order data with order number ${id}.`,
          // orderData,
          order_summary: {
               // id: orderData.id,
               // id_rooms,
               // price,
               orderSummary
               
          }
     });
} catch (error) {
     console.log(error);
     res.status(500).json({
          message: "Error fetching order data",
          error
     });
}
}