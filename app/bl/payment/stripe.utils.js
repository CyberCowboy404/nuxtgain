import crypto from 'node:crypto'

import Stripe from 'stripe'

const secretKey = ''
const stripe = new Stripe(secretKey)

// getActivePromotionCodes('')
// createPromoCodes('')
// disableAllPromotionCodes('')

function createPromoCodes(couponId) {
  // Function to generate unique codes
  function generateUniqueCode() {
    return crypto.randomBytes(6).toString('hex') // Generates a unique 12-character code
  }

  // Function to create promotion codes
  async function createPromotionCodes(couponId, count) {
    for (let i = 0; i < count; i++) {
      const uniqueCode = generateUniqueCode()
      console.log('Uniq Code', uniqueCode)

      try {
        const promotionCode = await stripe.promotionCodes.create({
          coupon: couponId,
          code: uniqueCode,
          max_redemptions: 1,
        })
        console.log('Promotion code created:', promotionCode.code)
      } catch (error) {
        console.error('Error creating promotion code:', error)
      }
    }
  }

  createPromotionCodes(couponId, 90)
}

async function getActivePromotionCodes(couponId) {
  try {
    // Retrieve all promotion codes with the specified coupon ID
    const promotionCodes = await stripe.promotionCodes.list({
      coupon: couponId,
      limit: 100, // Adjust the limit as needed
    })

    // Filter active promotion codes
    const activePromotionCodes = promotionCodes.data.filter(promotionCode => promotionCode.active)

    // Log active promotion codes
    activePromotionCodes.forEach((promotionCode) => {
      console.log(promotionCode.code)
    })

    console.log(`Total active promotion codes for coupon ${couponId}: ${activePromotionCodes.length}`)
  } catch (error) {
    console.error('Error retrieving promotion codes:', error)
  }
}

// Function to delete all promotion codes
async function disableAllPromotionCodes(couponId) {
  try {
    // Parameters for listing promotion codes
    const listParams = { limit: 100 }
    if (couponId) {
      listParams.coupon = couponId
    }

    // Retrieve all promotion codes (optionally filtered by coupon ID)
    const promotionCodes = await stripe.promotionCodes.list(listParams)

    // Loop through each promotion code and disable it
    for (const promotionCode of promotionCodes.data) {
      await stripe.promotionCodes.update(promotionCode.id, { active: false })
      console.log(`Promotion code disabled: ${promotionCode.id}`)
    }

    console.log('Promotion codes have been disabled.')
  } catch (error) {
    console.error('Error disabling promotion codes:', error)
  }
}

// Run the function to delete all promotion codes
