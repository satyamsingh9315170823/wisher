"use client";
import React, { useRef, useState, createContext } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items }) => {

  const carouselRef = useRef(null);

  return (

    <CarouselContext.Provider value={{ onCardClose: () => {}, currentIndex: 0 }}>
      
      <div className="w-full">

        <div
          ref={carouselRef}
          className="
          flex
          gap-6
          px-6
          md:px-10
          py-10
          overflow-x-auto
          scroll-smooth
          snap-x
          snap-mandatory
          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
          "
        >
          
          {items.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity:0 , y:40 }}
              animate={{ opacity:1 , y:0 }}
              transition={{ duration:.5 , delay:index*.08 }}
              className="
              snap-center
              flex-shrink-0
              w-[85%]
              sm:w-[70%]
              md:w-[420px]
              lg:w-[460px]
              "
            >
              {item}
            </motion.div>

          ))}

        </div>

      </div>

    </CarouselContext.Provider>
  );
};


export const Card = ({ card }) => {

  const [open,setOpen]=useState(false);

  return (
    <>
    
      <AnimatePresence>

        {open && (

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <motion.div
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              onClick={()=>setOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{opacity:0 , scale:.9}}
              animate={{opacity:1 , scale:1}}
              exit={{opacity:0 , scale:.9}}
              className="
              relative
              max-w-5xl
              w-full
              bg-zinc-900
              border border-white/10
              rounded-[2rem]
              p-6 md:p-10
              shadow-2xl
              "
            >

              <button
                onClick={()=>setOpen(false)}
                className="
                absolute
                right-5
                top-5
                h-10
                w-10
                rounded-full
                bg-white
                flex
                items-center
                justify-center
                text-black
                "
              >
                <X className="h-5 w-5"/>
              </button>

              <div className="mt-6">
                {card.content}
              </div>

            </motion.div>

          </div>

        )}

      </AnimatePresence>


      <motion.button

        onClick={()=>setOpen(true)}

        className="
        rounded-3xl
        bg-zinc-900
        h-[320px]
        w-full
        sm:h-[360px]
        md:h-[480px]
        overflow-hidden
        relative
        group
        border border-white/10
        shadow-xl
        transition-all
        duration-500
        hover:scale-[1.03]
        "

      >

        <div className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/60
        via-transparent
        to-transparent
        opacity-60
        group-hover:opacity-30
        transition
        "/>

        <img

          src={card.src}

          alt="memory"

          className="
          object-cover
          absolute
          inset-0
          w-full
          h-full
          transition-transform
          duration-700
          group-hover:scale-110
          "

        />

      </motion.button>

    </>
  );

};