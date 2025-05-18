import React from "react";
import {
  Award,
  Gift,
  Car,
  ParkingSquare,
  CreditCard,
  ChevronsRight,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type LoyaltyProgramProps = {
  points?: number;
  tier?: "bronze" | "silver" | "gold" | "platinum";
  nextTierPoints?: number;
};

const LoyaltyProgram = ({
  points = 750,
  tier = "silver",
  nextTierPoints = 1000,
}: LoyaltyProgramProps) => {
  const tierColors = {
    bronze: {
      bg: "bg-amber-100",
      border: "border-amber-200",
      text: "text-amber-800",
      accent: "text-amber-600",
      progress: "bg-amber-500",
    },
    silver: {
      bg: "bg-slate-100",
      border: "border-slate-200",
      text: "text-slate-800",
      accent: "text-slate-600",
      progress: "bg-slate-500",
    },
    gold: {
      bg: "bg-yellow-100",
      border: "border-yellow-200",
      text: "text-yellow-800",
      accent: "text-yellow-600",
      progress: "bg-yellow-500",
    },
    platinum: {
      bg: "bg-blue-100",
      border: "border-blue-200",
      text: "text-blue-800",
      accent: "text-blue-600",
      progress: "bg-blue-500",
    },
  };

  const tierBenefits = {
    bronze: [
      "5% off standard parking rates",
      "Earn 1 point per $1 spent",
      "Basic customer support",
    ],
    silver: [
      "10% off standard parking rates",
      "Earn 1.5 points per $1 spent",
      "Priority customer support",
      "Free cancellation up to 2 hours before",
    ],
    gold: [
      "15% off standard parking rates",
      "Earn 2 points per $1 spent",
      "Premium customer support",
      "Free cancellation up to 1 hour before",
      "Guaranteed spot availability",
    ],
    platinum: [
      "20% off standard parking rates",
      "Earn 3 points per $1 spent",
      "VIP customer support",
      "Free cancellation any time",
      "Guaranteed spot availability",
      "Free EV charging at selected locations",
    ],
  };

  const progressToNextTier = Math.min(
    Math.round((points / nextTierPoints) * 100),
    100
  );

  const getTierName = (tier: string) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  const getNextTier = (currentTier: string) => {
    const tiers = ["bronze", "silver", "gold", "platinum"];
    const currentIndex = tiers.indexOf(currentTier);
    if (currentIndex < tiers.length - 1) {
      return getTierName(tiers[currentIndex + 1]);
    }
    return null;
  };

  const getRewardItems = () => {
    return [
      {
        name: "Free Parking Day",
        points: 500,
        icon: <Car className="h-5 w-5" />,
        available: points >= 500,
      },
      {
        name: "Premium Spot Upgrade",
        points: 300,
        icon: <ParkingSquare className="h-5 w-5" />,
        available: points >= 300,
      },
      {
        name: "Extended Parking (2h)",
        points: 200,
        icon: <Clock className="h-5 w-5" />,
        available: points >= 200,
      },
      {
        name: "$10 Discount Coupon",
        points: 400,
        icon: <CreditCard className="h-5 w-5" />,
        available: points >= 400,
      },
    ];
  };

  const nextTier = getNextTier(tier);

  return (
    <div className="space-y-6">
      <div
        className={`rounded-lg ${tierColors[tier].bg} p-6 border ${tierColors[tier].border}`}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${tierColors[tier].text}`}>
              SmartPark Rewards
            </h2>
            <div className="flex items-center mt-1">
              <Award className={`h-5 w-5 ${tierColors[tier].accent} mr-1.5`} />
              <span className={`font-medium ${tierColors[tier].text}`}>
                {getTierName(tier)} Member
              </span>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={`${tierColors[tier].bg} ${tierColors[tier].text} border-0`}
          >
            {points} Points
          </Badge>
        </div>

        {nextTier && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className={tierColors[tier].text}>
                {getTierName(tier)} Tier
              </span>
              <span className={tierColors[tier].text}>{nextTier} Tier</span>
            </div>
            <Progress
              value={progressToNextTier}
              className={cn(
                "h-2",
                tierColors[tier].progress.replace("bg-", "bg-")
              )}
            />
            <p className={`text-xs mt-2 ${tierColors[tier].text}`}>
              {nextTierPoints - points} more points to reach {nextTier} status
            </p>
          </div>
        )}

        <div className="space-y-3">
          <h3 className={`font-medium ${tierColors[tier].text}`}>
            Your Benefits:
          </h3>
          <ul className="space-y-2">
            {tierBenefits[tier].map((benefit, index) => (
              <li key={index} className="flex items-start">
                <ChevronsRight
                  className={`h-4 w-4 ${tierColors[tier].accent} mt-0.5 mr-2 shrink-0`}
                />
                <span className={`text-sm ${tierColors[tier].text}`}>
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Gift className="h-5 w-5 mr-2 text-purple-500" />
            Redeem Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getRewardItems().map((reward, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border flex items-center justify-between ${
                  reward.available
                    ? "border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800"
                    : "border-gray-200 bg-gray-50 dark:bg-gray-800/20 dark:border-gray-700 opacity-60"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`p-2 rounded-full mr-3 ${
                      reward.available
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {reward.icon}
                  </div>
                  <div>
                    <h4
                      className={`font-medium ${
                        reward.available
                          ? "text-blue-900 dark:text-blue-300"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {reward.name}
                    </h4>
                    <p
                      className={`text-sm ${
                        reward.available
                          ? "text-blue-700 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-500"
                      }`}
                    >
                      {reward.points} points
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  disabled={!reward.available}
                  className={
                    reward.available ? "bg-blue-600 hover:bg-blue-700" : ""
                  }
                >
                  Redeem
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="flex items-center">
              View All Rewards <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyProgram;
