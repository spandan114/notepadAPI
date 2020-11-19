const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const nestedscheme = mongoose.model("Nested");

//fetch all note
router.post("/nestedadd", (req, res) => {
  const { transactiontype, account, acctype } = req.body;
  const createNested = new nestedscheme({
    account: [
      {
        accno: [
          {
            transactiontype: transactiontype,
            account: account,
          },
        ],
      },
      {
        acctype: acctype,
      },
    ],
  });
  createNested
    .save()
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/nestededit", (req, res) => {
  const { id, transactiontype, account, acctype } = req.body;
  var updateData = { 
    $set: {
    account: [
        {
          accno: [
            {
              transactiontype: transactiontype,
              account: account,
            },
          ],
        },
        {
          acctype: acctype,
        },
      ],
    }
    };

    nestedscheme.findOneAndUpdate({_id:id}, updateData)
    .then(data =>{
        res.json("note edited successfully")
    }).catch(err=>{console.log(err)})


});

// router.put("/nestedepush", (req, res) => {
//     const { id, transactiontype, account, acctype } = req.body;

//     const obj = {
//         transactiontype:transactiontype,
//         account:account
//     }

//     var updateData = { 
//         account:[{
//             $push:{accno:obj}
//         }]
//     }
  
//       nestedscheme.findOneAndUpdate({_id:id}, updateData)
//       .then(data =>{
//           res.json("note edited successfully")
//       }).catch(err=>{console.log(err)})
  
  
//   });
  

module.exports = router;




