import sys
from PIL import Image, ImageDraw
src=sys.argv[1]; out=sys.argv[2]
im=Image.open(src).convert('RGB'); W,H=im.size; px=im.load(); print(W,H,round(W/H,4))
def gray(p): r,g,b=p; return abs(r-g)<7 and abs(g-b)<7 and 12<r<40
def run(vals):
    best=(0,0);s=None
    for i in range(len(vals)+1):
        if i<len(vals) and vals[i]: s=i if s is None else s
        else:
            if s is not None and i-s>best[1]-best[0]: best=(s,i)
            s=None
    return best
for yy in (0.3,0.5):
    b=run([gray(px[x,int(H*yy)]) for x in range(W)]); print('win x %.3f %.3f'%(b[0]/W,b[1]/W))
for xx in (0.4,0.7):
    b=run([gray(px[int(W*xx),y]) for y in range(H)]); print('win y %.3f %.3f'%(b[0]/H,b[1]/H))
def bright(p): return max(p)>110
def frac(x0,x1,y0,y1):
    n=b=0
    for y in range(int(y0*H),int(y1*H),2):
        for x in range(int(x0*W),int(x1*W),2): n+=1; b+=bright(px[x,y])
    return b/n
regs={'emblem':(0,.19,0,.13),'name':(.195,.964,0,.10),'pips':(.036,.086,.136,.47),'race':(.10,.79,.649,.751),'text':(.10,.79,.761,.974),'stats':(.799,.964,.761,.974)}
for k,v in regs.items(): print(f'{k:8s} {frac(*v):.3f}')
for yy in [.85,.88,.91,.94,.97]:
    y=int(yy*H); xs=[x for x in range(int(W*.6),W) if bright(px[x,y])]; xl=[x for x in range(0,int(W*.4)) if bright(px[x,y])]
    print(yy,'R-in %.3f'%(min(xs)/W if xs else -1),'L-in %.3f'%(max(xl)/W if xl else -1))
d=ImageDraw.Draw(im)
def R(x0,x1,y0,y1,c,w=4): d.rectangle([x0*W,y0*H,x1*W,y1*H],outline=c,width=w)
R(.10,.965,.10,.64,(0,255,120)); R(.195,.964,0,.10,(80,170,255))
r=.14; cy=.043*W; d.ellipse([(.06-r)*W,cy-r*W,(.06+r)*W,cy+r*W],outline=(255,255,0),width=4)
R(.036,.086,.136,.47,(255,0,255)); R(.10,.79,.649,.751,(255,160,0)); R(.10,.79,.761,.974,(255,255,255)); R(.799,.964,.761,.974,(255,60,60))
im.resize((530,742)).save(out)
