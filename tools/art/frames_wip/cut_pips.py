"""레벨 아이콘 시트(3x3, 마젠타 바탕) → img/ui/pips/pip_<ID>.png (128x128 투명).
python3 cut_pips.py 시트.png 출력폴더"""
import sys
from PIL import Image
IDS=['B1','B2','B3','G1','G2','G3','A1','A2','A3']
src,outdir=sys.argv[1],sys.argv[2]
im=Image.open(src).convert('RGB'); W,H=im.size
T0,T1=70,190   # 마젠타 정도(min(R,B)-G) 이 사이에서 불투명 → 투명
def key(cell):
    w,h=cell.size; out=Image.new('RGBA',(w,h)); p=cell.load(); q=out.load()
    for y in range(h):
        for x in range(w):
            r,g,b=p[x,y]; m=min(r,b)-g
            a=1.0 if m<=T0 else 0.0 if m>=T1 else 1-(m-T0)/(T1-T0)
            if a<=0: q[x,y]=(0,0,0,0); continue
            if a<1:  # 마젠타 섞인 색을 풀어낸다
                r=(r-(1-a)*255)/a; g=g/a; b=(b-(1-a)*255)/a
            q[x,y]=(max(0,min(255,int(r))),max(0,min(255,int(g))),max(0,min(255,int(b))),int(a*255))
    return out
for i,ID in enumerate(IDS):
    cx,cy=i%3,i//3
    cell=im.crop((cx*W//3,cy*H//3,(cx+1)*W//3,(cy+1)*H//3))
    k=key(cell); bb=k.getchannel('A').point(lambda v:255 if v>24 else 0).getbbox()
    k=k.crop(bb); s=max(k.size); pad=round(s/0.85)   # 실루엣이 캔버스의 85%
    sq=Image.new('RGBA',(pad,pad)); sq.paste(k,((pad-k.size[0])//2,(pad-k.size[1])//2))
    sq.resize((128,128),Image.LANCZOS).save(f'{outdir}/pip_{ID}.png')
    print(ID,'bbox',bb,'size',k.size)
