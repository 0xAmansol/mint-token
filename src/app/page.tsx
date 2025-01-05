"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, ScaleIn } from "@/components/motion-wrapper";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const [balance, setBalance] = useState<number | null>(null);
  const wallet = useWallet();

  const LAMPORTS_PER_SOL = 1000000000;

  const connection = new Connection("https://api.devnet.solana.com");

  useEffect(() => {
    const address = wallet.publicKey;
    if (!address) return;
    const getBalance = async () => {
      const balance = await connection.getBalance(address);
      const solBalance = balance / LAMPORTS_PER_SOL;
      setBalance(solBalance);
      console.log(solBalance);
    };
    getBalance();
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <motion.section
        className="text-center space-y-6 py-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          OrbitToken
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          The next-generation Solana wallet adaptor that empowers you to manage
          your SOL and tokens with ease
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button size="lg" className="font-semibold" asChild>
            <motion.a
              href="#wallet-overview"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </Button>
        </motion.div>
      </motion.section>

      {/* Wallet Overview */}
      <ScaleIn delay={0.6}>
        <section id="wallet-overview" className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Wallet Overview</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage your tokens and transactions
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon">
                  <Wallet className="h-4 w-4" />
                </Button>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Total Balance
                  </div>
                  <motion.div
                    className="text-3xl font-bold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    {balance} SOL
                  </motion.div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button>Get Airdrop</Button>
                </motion.div>
              </motion.div>

              <FadeIn delay={1}>
                <Tabs defaultValue="token-balance" className="w-full ">
                  <TabsList className="grid w-full grid-cols-3 lg:w-[400px] ">
                    {["Token Balance", "Transfer", "Create Token"].map(
                      (tab) => (
                        <motion.div
                          key={tab}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <TabsTrigger
                            value={tab.toLowerCase().replace(" ", "-")}
                          >
                            {tab}
                          </TabsTrigger>
                        </motion.div>
                      )
                    )}
                  </TabsList>
                  <TabsContent value="token-balance" className="py-4">
                    <motion.div
                      className="text-center py-8 text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Wallet not connected
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="transfer" className="py-4">
                    <motion.div
                      className="text-center py-8 text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Connect wallet to transfer tokens
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="create-token" className="py-4">
                    <motion.div
                      className="text-center py-8 text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Connect wallet to create tokens
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </FadeIn>
            </CardContent>
          </Card>
        </section>
      </ScaleIn>
    </div>
  );
}
