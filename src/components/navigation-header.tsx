"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function NavigationHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.header
      className="border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="font-bold text-xl flex items-center space-x-2"
          >
            <motion.span
              className="w-6 h-6 rounded-full border-2 border-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span>OrbitToken</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { name: "Home", path: "/" },
              { name: "Create Token", path: "/create-token" },
              { name: "Transaction", path: "/transaction" },
              { name: "Account", path: "/account" },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.path}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <motion.div
            className="hidden md:flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            Devnet
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <WalletMultiButton
              style={{
                paddingTop: "0.625rem",
                paddingBottom: "0.625rem",
                paddingLeft: "1.25rem",
                paddingRight: "1.25rem",
                marginBottom: "0.5rem",
                borderRadius: "0.5rem",
                borderWidth: "3px",
                borderColor: "black",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: 500,
                color: "#111827",
                backgroundColor: "#ffffff",
              }}
            >
              Select Wallet
            </WalletMultiButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
