import svgPaths from "./svg-agups2ml6g";
import clsx from "clsx";
import imgContainer from "figma:asset/839147abd9acdcb550d2775b270328914885b426.png";

function Wrapper6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative size-full">{children}</div>
    </div>
  );
}

function Wrapper5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[40px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        {children}
      </svg>
    </div>
  );
}
type Wrapper4Props = {
  additionalClassNames?: string;
};

function Wrapper4({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper4Props>) {
  return (
    <div className={clsx("size-[24px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}

function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative">{children}</div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function Icon3({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1>
      <g id="Icon">{children}</g>
    </Wrapper1>
  );
}
type Container28Props = {
  additionalClassNames?: string;
};

function Container28({ children, additionalClassNames = "" }: React.PropsWithChildren<Container28Props>) {
  return (
    <div className={clsx("bg-white place-self-stretch relative rounded-[10px] shrink-0", additionalClassNames)}>
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-0 pt-[32px] px-[32px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("h-[24px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Domine:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#363636] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px]">{text}</p>
    </div>
  );
}
type ParagraphTextProps = {
  text: string;
};

function ParagraphText({ text }: ParagraphTextProps) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="basis-0 font-['Domine:Regular',sans-serif] font-normal grow leading-[26px] min-h-px min-w-px relative shrink-0 text-[#4a5565] text-[16px] text-center tracking-[-0.3125px]">{text}</p>
    </div>
  );
}

function Helper() {
  return (
    <Wrapper2>
      {[...Array(4).keys()].map((_, i) => (
        <Icon1 />
      ))}
      <Icon2 />
      <TextText text="(45)" />
    </Wrapper2>
  );
}
type ButtonText2Props = {
  text: string;
};

function ButtonText2({ text }: ButtonText2Props) {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Wrapper3>
        <EpRight />
        <p className="font-['Domine:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#363636] text-[16px] text-nowrap tracking-[-0.3125px]">{text}</p>
      </Wrapper3>
    </div>
  );
}

function EpRight() {
  return (
    <Wrapper4 additionalClassNames="relative shrink-0">
      <g id="ep:right">
        <path d={svgPaths.p3308cd00} fill="var(--fill-0, black)" id="Vector" />
      </g>
    </Wrapper4>
  );
}
type ButtonText1Props = {
  text: string;
};

function ButtonText1({ text }: ButtonText1Props) {
  return (
    <div className="bg-[#222] relative shrink-0 w-full">
      <Wrapper3>
        <Icons8Buy />
        <p className="font-['Domine:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-white tracking-[-0.3125px] w-[75px]">{text}</p>
      </Wrapper3>
    </div>
  );
}

function Icons8Buy() {
  return (
    <Wrapper4 additionalClassNames="relative shrink-0">
      <g id="icons8:buy">
        <path d={svgPaths.pcfe3200} fill="var(--fill-0, white)" id="Vector" />
      </g>
    </Wrapper4>
  );
}
type Container1Props = {
  text: string;
  text1: string;
};

function Container1({ text, text1 }: Container1Props) {
  return (
    <div className="content-stretch flex font-['Domine:Regular',sans-serif] font-normal gap-[8px] h-[28px] items-center relative shrink-0 text-nowrap w-full">
      <p className="leading-[28px] relative shrink-0 text-[#101828] text-[20px] tracking-[-0.4492px]">{text}</p>
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[20px] line-through relative shrink-0 text-[#99a1af] text-[14px] tracking-[-0.1504px]">{text1}</p>
    </div>
  );
}
type TextText1Props = {
  text: string;
};

function TextText1({ text }: TextText1Props) {
  return (
    <div className="bg-[#dcfce7] h-[22px] relative rounded-[1.67772e+07px] shrink-0 w-[55.227px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[4px] relative size-full">
        <p className="font-['Domine:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#016630] text-[12px] text-nowrap">{text}</p>
      </div>
    </div>
  );
}
type TextTextProps = {
  text: string;
};

function TextText({ text }: TextTextProps) {
  return (
    <div className="h-[16px] relative shrink-0 w-[24.313px]">
      <p className="absolute font-['Domine:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[12px] top-px w-[25px]">{text}</p>
    </div>
  );
}

function Icon2() {
  return (
    <Wrapper>
      <path d={svgPaths.p6932200} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
    </Wrapper>
  );
}

function Icon1() {
  return (
    <Wrapper>
      <path d={svgPaths.p6932200} fill="var(--fill-0, #FDC700)" id="Vector" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
    </Wrapper>
  );
}

function ContainerImage() {
  return (
    <div className="h-[284px] overflow-clip relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f9fafb] inset-0" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgContainer} />
      </div>
      <ContainerText text="-50%" />
      <UiwLeft />
      <UiwRight />
    </div>
  );
}

function UiwRight() {
  return (
    <Wrapper4 additionalClassNames="absolute left-[349.5px] top-[130px]">
      <g id="uiw:right">
        <path clipRule="evenodd" d={svgPaths.pc91d380} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
      </g>
    </Wrapper4>
  );
}

function UiwLeft() {
  return (
    <Wrapper4 additionalClassNames="absolute left-[16.5px] top-[130px]">
      <g id="uiw:left">
        <path clipRule="evenodd" d={svgPaths.pbe7f360} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
      </g>
    </Wrapper4>
  );
}
type ContainerTextProps = {
  text: string;
};

function ContainerText({ text }: ContainerTextProps) {
  return (
    <div className="absolute bg-[#fb2c36] h-[28px] right-[16.4px] rounded-[1.67772e+07px] top-[16px] w-[60.43px]">
      <p className="absolute font-['Domine:Regular',sans-serif] font-normal leading-[20px] left-[12px] text-[14px] text-white top-[4.5px] tracking-[-0.1504px] w-[37px]">{text}</p>
    </div>
  );
}
type ButtonTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonText({ text, additionalClassNames = "" }: ButtonTextProps) {
  return (
    <div className={clsx("bg-white content-stretch flex items-center justify-center py-[8px] relative shrink-0 w-[180px]", additionalClassNames)}>
      <p className="font-['Domine:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#364153] text-[16px] text-center text-nowrap tracking-[-0.3125px]">{text}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 text-center w-full">
      <div className="font-['Libre_Caslon_Display:Regular',sans-serif] leading-none min-w-full not-italic relative shrink-0 text-[#363636] text-[100px] tracking-[-1.677px] w-[min-content]">
        <p className="mb-0">{`Xatirələrini şəkildə yox, `}</p>
        <p>Canlı saxla</p>
      </div>
      <p className="font-['Domine:Regular',sans-serif] font-normal leading-[32.5px] relative shrink-0 text-[16px] text-[rgba(102,102,102,0.9)] tracking-[-0.4492px] w-[628px]">Köhnə fotoları süni intellektlə canlandırın. Sehrli çərçivələrimizlə keçmişə səyahət edin və unudulmaz anları yenidən yaşayın.</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col h-[553px] items-center justify-center pb-0 pt-[80px] px-0 relative shrink-0 w-full">
      <Frame />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#222] content-stretch flex items-center justify-center px-[22px] py-[8px] relative shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-[180px]" data-name="Button">
      <p className="font-['Domine:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.3125px]">Hamısı</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Button />
      <ButtonText text="Hədiyyə" additionalClassNames="px-[41px]" />
      <ButtonText text="Biznes məhsulları" additionalClassNames="px-[16px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Domine:Regular',sans-serif] font-normal leading-[48px] relative shrink-0 text-[#0a0a0a] text-[24px] text-center text-nowrap tracking-[0.3516px]">Məhsullarımız</p>
      <Frame2 />
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="bg-[#60d669] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[3360px] shrink-0 w-[32px]" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#3fb848] border-solid inset-0 pointer-events-none rounded-[3360px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="mingcute:whatsapp-fill">
          <div className="absolute inset-[6.25%_8.33%_2.86%_8.33%]" data-name="Group">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
              <g id="Group">
                <g id="Vector"></g>
                <path clipRule="evenodd" d={svgPaths.p17ece080} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[3360px] shrink-0 size-[32px]" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[3360px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
        <div className="relative shrink-0 size-[12px]" data-name="ion:call">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <g id="ion:call">
              <path d={svgPaths.p1a3c1bc0} fill="var(--fill-0, #666666)" id="Vector" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[6.25%_8.33%_10.42%_8.33%]">
          <div className="absolute inset-[-3.75%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
              <g id="Group 1">
                <path d={svgPaths.p34951c00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.p3d5aea00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M0.5 7.16675H13.8333" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex h-[48px] items-center justify-between left-1/2 top-[20px] translate-x-[-50%] w-[1287px]">
      <div className="content-stretch flex font-['Domine:Regular',sans-serif] font-normal gap-[32px] h-[20px] items-center leading-[20px] relative shrink-0 text-[#0a0a0a] text-[14px] text-center text-nowrap tracking-[0.5496px]" data-name="Navigation">
        <p className="relative shrink-0">Məhsullar</p>
        <p className="relative shrink-0">Haqqımızda</p>
        <p className="relative shrink-0">Əlaqə</p>
      </div>
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <div className="content-stretch flex gap-[6px] h-[36px] items-center px-[4px] py-0 relative rounded-[10px] shrink-0" data-name="Button">
          <Frame5 />
          <div className="relative shrink-0">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
              <p className="font-['Domine:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#0a0a0a] text-[12px] text-center text-nowrap tracking-[-0.1504px]">AZ</p>
              <div className="relative shrink-0 size-[16px]" data-name="lsicon:down-filled">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="lsicon:down-filled">
                    <path clipRule="evenodd" d={svgPaths.p3ac1c000} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0">
          <Icon />
          <p className="font-['Domine:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#0a0a0a] text-[14px] text-center text-nowrap tracking-[0.5496px]">+994 50 223 57 20</p>
        </div>
      </div>
      <div className="absolute inset-[0_46.46%_0_45.53%]" data-name="Group">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 48">
          <g id="Group">
            <path d={svgPaths.p2b34fc00} fill="var(--fill-0, #232016)" id="Vector" />
            <path d={svgPaths.p2d30b5f0} fill="var(--fill-0, #232016)" id="Vector_2" />
            <path d={svgPaths.p9563c00} fill="var(--fill-0, #232016)" id="Vector_3" />
            <path d={svgPaths.p6e35cc0} fill="var(--fill-0, #232016)" id="Vector_4" />
            <path d={svgPaths.p24f95c00} fill="var(--fill-0, #232016)" id="Vector_5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
        <Wrapper2>
          <Icon1 />
          {[...Array(3).keys()].map((_, i) => (
            <Icon1 />
          ))}
          <Icon2 />
          <TextText text="(45)" />
        </Wrapper2>
        <TextText1 text="Stokda" />
      </div>
      <p className="font-['Domine:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#0a0a0a] text-[20px] tracking-[-0.4395px] w-full">Şəkillərin Süni İntellekt vasitəsilə canlanması</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame4 />
      <Container1 text="$4.99" text1="$9.99" />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <ButtonText1 text="Birbaşa al" />
      <ButtonText2 text="Ətraflı bax" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full">
      <Frame15 />
      <Frame13 />
    </div>
  );
}

function Container2() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col items-start min-w-[350px] overflow-clip relative shrink-0" data-name="Container">
      <ContainerImage />
      <Frame14 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Helper />
      <TextText1 text="Stokda" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Container3 />
      <p className="font-['Domine:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#0a0a0a] text-[20px] tracking-[-0.4395px] w-full">Şəkillərin Süni İntellekt vasitəsilə canlanması</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame12 />
      <Container1 text="$4.99" text1="$9.99" />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <ButtonText1 text="Birbaşa al" />
      <ButtonText2 text="Ətraflı bax" />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full">
      <Frame18 />
      <Frame19 />
    </div>
  );
}

function Container4() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col items-start min-w-[350px] overflow-clip relative shrink-0" data-name="Container">
      <ContainerImage />
      <Frame20 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Helper />
      <TextText1 text="Stokda" />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Container5 />
      <p className="font-['Domine:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#0a0a0a] text-[20px] tracking-[-0.4395px] w-full">Şəkillərin Süni İntellekt vasitəsilə canlanması</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame21 />
      <Container1 text="$4.99" text1="$9.99" />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <ButtonText1 text="Birbaşa al" />
      <ButtonText2 text="Ətraflı bax" />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full">
      <Frame22 />
      <Frame23 />
    </div>
  );
}

function Container6() {
  return (
    <div className="[grid-area:1_/_3] content-stretch flex flex-col items-start min-w-[350px] overflow-clip relative shrink-0" data-name="Container">
      <ContainerImage />
      <Frame24 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Helper />
      <TextText1 text="Stokda" />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Container7 />
      <p className="font-['Domine:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#0a0a0a] text-[20px] tracking-[-0.4395px] w-full">Şəkillərin Süni İntellekt vasitəsilə canlanması</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame25 />
      <Container1 text="$4.99" text1="$9.99" />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <ButtonText1 text="Birbaşa al" />
      <ButtonText2 text="Ətraflı bax" />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full">
      <Frame26 />
      <Frame27 />
    </div>
  );
}

function Container8() {
  return (
    <div className="[grid-area:2_/_1] content-stretch flex flex-col items-start min-w-[350px] overflow-clip relative shrink-0" data-name="Container">
      <ContainerImage />
      <Frame28 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Helper />
      <TextText1 text="Stokda" />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Container9 />
      <p className="font-['Domine:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#0a0a0a] text-[20px] tracking-[-0.4395px] w-full">Şəkillərin Süni İntellekt vasitəsilə canlanması</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame29 />
      <Container1 text="$4.99" text1="$9.99" />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <ButtonText1 text="Birbaşa al" />
      <ButtonText2 text="Ətraflı bax" />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full">
      <Frame30 />
      <Frame31 />
    </div>
  );
}

function Container10() {
  return (
    <div className="[grid-area:2_/_2] content-stretch flex flex-col items-start min-w-[350px] overflow-clip relative shrink-0" data-name="Container">
      <ContainerImage />
      <Frame32 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Helper />
      <TextText1 text="Stokda" />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Container11 />
      <p className="font-['Domine:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#0a0a0a] text-[20px] tracking-[-0.4395px] w-full">Şəkillərin Süni İntellekt vasitəsilə canlanması</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame33 />
      <Container1 text="$4.99" text1="$9.99" />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <ButtonText1 text="Birbaşa al" />
      <ButtonText2 text="Ətraflı bax" />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full">
      <Frame34 />
      <Frame35 />
    </div>
  );
}

function Container12() {
  return (
    <div className="[grid-area:2_/_3] content-stretch flex flex-col items-start min-w-[350px] overflow-clip relative shrink-0" data-name="Container">
      <ContainerImage />
      <Frame36 />
    </div>
  );
}

function Container13() {
  return (
    <div className="gap-[20px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(2,_fit-content(100%))] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container4 />
      <Container6 />
      <Container8 />
      <Container10 />
      <Container12 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full">
      <Frame3 />
      <Container13 />
    </div>
  );
}

function LandingAbout() {
  return (
    <div className="bg-[#f9f9f9] relative shrink-0 w-full" data-name="LandingAbout">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[103.5px] py-[80px] relative w-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[48px] left-0 top-0 w-[1216px]" data-name="Heading 2">
      <p className="absolute font-['Domine:Bold',sans-serif] font-bold leading-[48px] left-[607.66px] text-[#0a0a0a] text-[48px] text-center text-nowrap top-[0.5px] tracking-[0.3516px] translate-x-[-50%]">Biz Kimik?</p>
    </div>
  );
}

function Container14() {
  return <div className="absolute bg-[#dedede] h-[2px] left-[559.5px] top-[72.3px] w-[96px]" data-name="Container" />;
}

function Container15() {
  return (
    <div className="h-[195.75px] relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container14 />
      <p className="absolute font-['Domine:Regular',sans-serif] font-normal leading-[29.25px] left-[608.23px] text-[#4a5565] text-[18px] text-center top-[108.5px] tracking-[-0.4395px] translate-x-[-50%] w-[768px]">{`Hisset.az – xatirələrə nəfəs verən ilk platformadır. Biz sadəcə köhnə şəkilləri bərpa etmirik, onları ən son texnologiya ilə canlandırır, hərəkət və duyğu qatırıq. Sizin ən dəyərli anlarınızı əbədiləşdirmək və 'o anı' təkrar yaşatmaq bizim missiyamızdır.`}</p>
    </div>
  );
}

function IcOutlineSettingsBackupRestore() {
  return (
    <Wrapper5>
      <g id="ic:outline-settings-backup-restore">
        <path d={svgPaths.p973fb80} fill="var(--fill-0, black)" id="Vector" />
      </g>
    </Wrapper5>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex h-[40px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <IcOutlineSettingsBackupRestore />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Domine:Regular',sans-serif] font-normal leading-[28px] left-[160.07px] text-[#0a0a0a] text-[20px] text-center text-nowrap top-0 tracking-[-0.4492px] translate-x-[-50%]">AI Bərpası və Canlanma</p>
    </div>
  );
}

function Container17() {
  return (
    <Container28 additionalClassNames="[grid-area:1_/_1]">
      <Container16 />
      <Heading1 />
      <ParagraphText text="Cırılmış fotoların bərpası və videoya çevrilməsi" />
    </Container28>
  );
}

function MdiMagic() {
  return (
    <Wrapper5>
      <g id="mdi:magic">
        <path d={svgPaths.p29f241f0} fill="var(--fill-0, black)" id="Vector" />
      </g>
    </Wrapper5>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[40px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <MdiMagic />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Domine:Regular',sans-serif] font-normal leading-[28px] left-[160.7px] text-[#0a0a0a] text-[20px] text-center text-nowrap top-0 tracking-[-0.4492px] translate-x-[-50%]">Sehrli QR Texnologiyası</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Domine:Regular',sans-serif] font-normal leading-[26px] left-[159.91px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%]">Sadəcə telefonu yaxınlaşdırın və anı yaşayın</p>
    </div>
  );
}

function Container19() {
  return (
    <Container28 additionalClassNames="[grid-area:1_/_2]">
      <Container18 />
      <Heading3 />
      <Paragraph />
    </Container28>
  );
}

function FluentPremium16Filled() {
  return (
    <Wrapper5>
      <g id="fluent:premium-16-filled">
        <path d={svgPaths.pcc35100} fill="var(--fill-0, black)" id="Vector" />
      </g>
    </Wrapper5>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex h-[40px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <FluentPremium16Filled />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Domine:Regular',sans-serif] font-normal leading-[28px] left-[160.19px] text-[#0a0a0a] text-[20px] text-center text-nowrap top-0 tracking-[-0.4492px] translate-x-[-50%]">Premium Hədiyyə</p>
    </div>
  );
}

function Container21() {
  return (
    <Container28 additionalClassNames="[grid-area:1_/_3]">
      <Container20 />
      <Heading4 />
      <ParagraphText text="Yüksək keyfiyyətli çərçivə və özəl qablaşdırma" />
    </Container28>
  );
}

function Container22() {
  return (
    <div className="gap-[32px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[212px] relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container19 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[471.75px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[64px] items-start px-[32px] py-0 relative size-full">
          <Container15 />
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function LandingAbout1() {
  return (
    <div className="h-[631.75px] relative shrink-0 w-full" data-name="LandingAbout">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-0 pt-[80px] px-[103.5px] relative size-full">
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="h-[48px] relative shrink-0 w-[103.174px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 48">
        <g id="Group">
          <path d={svgPaths.p2b34fc00} fill="var(--fill-0, #232016)" id="Vector" />
          <path d={svgPaths.p1246f800} fill="var(--fill-0, #232016)" id="Vector_2" />
          <path d={svgPaths.p9563c00} fill="var(--fill-0, #232016)" id="Vector_3" />
          <path d={svgPaths.p6e35cc0} fill="var(--fill-0, #232016)" id="Vector_4" />
          <path d={svgPaths.pb8f4800} fill="var(--fill-0, #232016)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <Group />
      <p className="font-['Domine:Regular',sans-serif] font-normal leading-[26px] relative shrink-0 text-[16px] text-[rgba(54,54,54,0.6)] tracking-[-0.3125px] w-[412px]">Köhnə fotoları süni intellektlə canlandırın. Sehrli çərçivələrimizlə keçmişə səyahət edin və unudulmaz anları yenidən yaşayın.</p>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Domine:Regular',sans-serif] font-normal leading-[28px] left-0 text-[18px] text-[rgba(54,54,54,0.6)] text-nowrap top-0 tracking-[-0.4395px]">Sürətli Keçidlər</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[80.102px]" data-name="Button">
      <p className="absolute font-['Domine:Regular',sans-serif] font-normal leading-[24px] left-[40px] text-[16px] text-[rgba(54,54,54,0.6)] text-center text-nowrap top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%]">Ana Səhifə</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Button1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[72.578px]" data-name="Button">
      <p className="absolute font-['Domine:Regular',sans-serif] font-normal leading-[24px] left-[36px] text-[16px] text-[rgba(54,54,54,0.6)] text-center text-nowrap top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%]">Məhsullar</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Button2 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[88.094px]" data-name="Button">
      <p className="absolute font-['Domine:Regular',sans-serif] font-normal leading-[24px] left-[44.5px] text-[16px] text-[rgba(54,54,54,0.6)] text-center text-nowrap top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%]">Haqqımızda</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Button3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[88.094px]" data-name="Button">
      <p className="absolute font-['Domine:Regular',sans-serif] font-normal leading-[24px] left-[-0.5px] text-[16px] text-[rgba(54,54,54,0.6)] text-nowrap top-[-0.5px] tracking-[-0.3125px]">Əlaqə</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Button4 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[373.336px]" data-name="Container">
      <Heading2 />
      <List />
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-0 top-[0.45px] w-[412px]">
      <Paragraph1 />
      <Container24 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col font-['Domine:Regular',sans-serif] font-normal gap-[14px] items-start relative shrink-0 text-center">
      <p className="leading-[48px] relative shrink-0 text-[#0a0a0a] text-[40px] text-nowrap tracking-[0.3516px]">Nə alacağınızı hələdə bilmirsiz?</p>
      <p className="leading-[26px] min-w-full relative shrink-0 text-[#363636] text-[16px] tracking-[-0.3125px] w-[min-content]">Bizə yazın, satış əməkdaşlarımız sizə seçim etməkdə dəstək olsun.</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[8.33%_8.33%_0.78%_8.33%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 33">
        <g id="Group">
          <g id="Vector"></g>
          <path clipRule="evenodd" d={svgPaths.p4c4e480} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MingcuteWhatsappFill() {
  return (
    <div className="overflow-clip relative shrink-0 size-[36px]" data-name="mingcute:whatsapp-fill">
      <Group1 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#222] h-[88px] relative shrink-0 w-full" data-name="Button">
      <Wrapper6>
        <MingcuteWhatsappFill />
        <p className="font-['Domine:Regular',sans-serif] font-normal leading-[48px] relative shrink-0 text-[24px] text-center text-nowrap text-white tracking-[-0.625px]">Whatsapp ilə əlaqəyə keç</p>
      </Wrapper6>
    </div>
  );
}

function IonCall() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="ion:call">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="ion:call">
          <path d={svgPaths.pb50de00} fill="var(--fill-0, #666666)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[88px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none" />
      <Wrapper6>
        <IonCall />
        <p className="font-['Domine:Regular',sans-serif] font-normal leading-[48px] relative shrink-0 text-[#666] text-[24px] text-center text-nowrap tracking-[-0.625px]">+994 50 223 57 20</p>
      </Wrapper6>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Button5 />
      <Button6 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] h-[390px] items-end justify-center left-[560px] p-[40px] top-px">
      <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none" />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Container25() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1277px]" data-name="Container">
      <Frame11 />
      <Frame10 />
    </div>
  );
}

function Icon4() {
  return (
    <Icon3>
      <path d={svgPaths.p30c8d680} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Icon3>
  );
}

function Link() {
  return (
    <div className="bg-[#222] content-stretch flex items-center justify-center relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Link">
      <Icon4 />
    </div>
  );
}

function Icon5() {
  return (
    <Wrapper1>
      <g clipPath="url(#clip0_1_460)" id="Icon">
        <path d={svgPaths.p4b98700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p19f4a800} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M14.5833 5.41667H14.5917" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_1_460">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </Wrapper1>
  );
}

function Link1() {
  return (
    <div className="bg-[#222] content-stretch flex items-center justify-center relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Link">
      <Icon5 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-center relative">
        <Link />
        <Link1 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <Wrapper1>
      <g clipPath="url(#clip0_1_423)" id="Icon">
        <path d={svgPaths.p28f08480} id="Vector" stroke="var(--stroke-0, #363636)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_1_423">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </Wrapper1>
  );
}

function ListItem4() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0" data-name="List Item">
      <Icon6 />
      <Text text="+994502235720" additionalClassNames="w-[124.734px]" />
    </div>
  );
}

function Icon7() {
  return (
    <Icon3>
      <path d={svgPaths.p26ddc800} id="Vector" stroke="var(--stroke-0, #363636)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p35ba4680} id="Vector_2" stroke="var(--stroke-0, #363636)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Icon3>
  );
}

function ListItem5() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0" data-name="List Item">
      <Icon7 />
      <Text text="Bakı, Azərbaycan, 28 may" additionalClassNames="w-[186.961px]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute left-[calc(50%+0.35px)] top-[8px] translate-x-[-50%]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center justify-end relative">
        <ListItem4 />
        <ListItem5 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Frame7 />
      <p className="font-['Domine:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#363636] text-[16px] text-center text-nowrap tracking-[-0.3125px]">© 2025 Hisset.az . Bütün hüquqlar qorunur.</p>
      <Frame6 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start px-0 py-[24px] relative shrink-0 w-[1277px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e3e3e3] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container26 />
    </div>
  );
}

function LandingFooter() {
  return (
    <div className="bg-[#f9f9f9] h-[663px] relative shrink-0 w-full" data-name="LandingFooter">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-center pb-0 pt-[64px] px-[32px] relative size-full">
          <Container25 />
          <Container27 />
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1487px]">
      <LandingAbout />
      <LandingAbout1 />
      <LandingFooter />
    </div>
  );
}

function App() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0" data-name="App">
      <Frame17 />
      <Frame16 />
    </div>
  );
}

export default function AnaShifHazirlama() {
  return (
    <div className="bg-[#edebea] content-stretch flex gap-[10px] items-center relative size-full" data-name="Ana Səhifə Hazırlama">
      <Container />
      <App />
    </div>
  );
}