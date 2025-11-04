import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Subscription name is required"],
            trim: true,
            minLenghth: [3, "Subscription name must be at least 3 characters long"],
            maxLength: [50, "Subscription name must be at most 50 characters long"]
        },
        price: {
            type: Number,
            required: [true, "Subscription price is required"],
            min: [0, "Subscription price must be at least 0"]
        },
        currency: {
            type: String,
            required: [true, "Currency is required"],
            enum: ["USD", "EUR", "GBP", "JPY", "AUD","NPR"],
            default: "USD"
        },
        frequency: {
            type: String,
            required: [true, "Subscription frequency is required"],
            enum: ["daily","monthly", "yearly", "weekly"]
        },
        category: {
            type: String,
            required: [true, "Subscription category is required"],
            enum: ["entertainment", "productivity", "education", "health", "other"]
        },
        paymentMethod: {
            type: String,
            required: [true, "Payment method is required"],
            trim: true,
        },
        status: {
            type: String,
            required: [true, "Subscription status is required"],
            enum: ["active", "inactive", "canceled"],
            default: "active"
        },
        startDate: {
            type: Date,
            required: [true, "Subscription start date is required"],
            validate: {
                validator: function(value) {
                    return value <= new Date();
                },
                message: "Start date cannot be in the future"
            }
        },
        renewalDate: {
            type: Date,
            validate: {
                validator: function(value) {
                    return !value || value > this.startDate;
                },
                message: "Renewal date must be after start date"
            }
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        }
    },
    { timestamps: true }
);

SubscriptionSchema.pre("save", function(next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    if(this.renewalDate < new Date()){
        this.status = "expired";
    }

    next();
});


const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;